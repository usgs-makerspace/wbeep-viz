<template>
  <div
    id="temperature_viz_container"
    @click.once="clickAnywhereToCloseMapInfoBox"
  >
    <LoadingScreenInternal
      :is-loading="isLoading"
    />
    <WorkInProgressWarning />
    <div id="mapContainer">
      <MapSubtitle
        :is-about-map-info-box-open="isAboutMapInfoBoxOpen"
        @clickedInfoIcon="toggleMapInfoBox()"
        @clickedExit="toggleMapInfoBox()"
      />
      <MapLegend
        :legend-title="legendTitle"
      />
      <MglMap
        id="mapgl-water-temperature-mapbox-map"
        :container="container"
        :map-style="mapStyle"
        :zoom="zoom"
        :min-zoom="minZoom"
        :max-zoom="maxZoom"
        :center="center"
        :pitch="pitch"
        :bearing="bearing"
        :pitch-with-rotate="false"
        :drag-rotate="false"
        :touch-zoom-rotate="false"
        :interactive="isInteractive"
        :max-bounds="maxBounds"
        @load="onMapLoaded"
      >
        <MglAttributionControl
          position="bottom-right"
          :compact="false"
          custom-attribution="© <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <MglNavigationControl
          position="top-right"
          :show-compass="false"
        />
         
        <QuestionControl :feature-name="featureName" />
         
        <MglScaleControl
          position="bottom-right"
          unit="imperial"
        />
        <MglFullscreenControl position="bottom-right" />
        <MglGeolocateControl position="bottom-right" />
        <MapLayers />
      </MglMap>
    </div>
    <!--The next div contains information to show the current zoom level of the map. This will only show on the
          development version of the application. To find the code controlling this, search for 'zoom level display' -->
    <div id="zoom-level-div" />
  </div>
</template>

<script>
    import LoadingScreenInternal from "../../components/LoadingScreenInternal";
    import mapboxgl from "mapbox-gl";
    import MapSubtitle from "../../components/MapSubtitle";
    import MapLayers from "../../components/MapLayers";
    import MapLegend from "../../components/MapLegend";
    import { icon } from "@fortawesome/fontawesome-svg-core";
    import QuestionControl from "../../components/QuestionControl";
    import WorkInProgressWarning from "../../components/WorkInProgressWarning";
    import {
        MglMap,
        MglNavigationControl,
        MglGeolocateControl,
        MglFullscreenControl,
        MglScaleControl,
        MglAttributionControl
    } from 'vue-mapbox';
    import mapStyles from "../../assets/mapStyles/waterTemperature/mapStyles";

    export default {
        name: 'WaterStorage',
        components: {
            LoadingScreenInternal,
            MapSubtitle,
            MglMap,
            MglNavigationControl,
            MglGeolocateControl,
            MglFullscreenControl,
            MglScaleControl,
            MglAttributionControl,
            MapLegend,
            MapLayers,
            QuestionControl,
            WorkInProgressWarning
        },
        data() {
            return {
                featureName: 'Water Temperature',
                mapStyle: mapStyles.style,
                container: 'map',
                zoom: 2,
                minZoom: 2,
                maxZoom: 5.99,
                center: [-95.7129, 37.0902],
                pitch: 0, // tips the map from 0 to 60 degrees
                bearing: 0, // starting rotation of the map from 0 to 360
                maxBounds: [[-168.534393,-4.371744], [-19.832382,71.687625]], // The coordinates needed to make a bounding box for the continental United States.
                isInteractive: true,
                legendTitle: 'Water Temp',
                isLoading: true,
                currentZoom: null,
                isAboutMapInfoBoxOpen: true,
                isFirstClick: true,
                mapLayerIdsForZoomDependentButtons: ['Terrain', 'Counties']
            }
        },
        methods: {
            addZoomLevelIndicator() {
                const map = this.$store.temperaturePredictionMap;
                this.currentZoom = map.getZoom();
                process.env.VUE_APP_ADD_ZOOM_LEVEL_DISPLAY === 'true' ?
                        document.getElementById('zoom-level-div').innerHTML = 'Current Zoom Level (listed for development purposes): ' + this.currentZoom : null;
            },
            filterLayersForButtons: function(targetId) {
              const map = this.$store.temperaturePredictionMap;

              let filteredMapLayer = map.getStyle().layers.filter(function(mapStyleLayer) {
                  return  mapStyleLayer.id === targetId;
              });

              return filteredMapLayer;
          },
          changeButtonStateBasedOnZoomLevel() {
              const map = this.$store.temperaturePredictionMap;
              const self = this;
              this.mapLayerIdsForZoomDependentButtons.forEach(function(buttonId) {
                  let layerToChange = self.filterLayersForButtons(buttonId);
                  buttonId = buttonId.replace(/\s/g, ''); // Note: Element IDs cannot have white space so we know that we shouldn't look for any with white space
                  const targetElement = document.getElementById(`${buttonId}-button`);

                  if (layerToChange[0].minzoom > self.currentZoom) {
                      targetElement.className = 'unavailable';
                      targetElement.disabled = true;
                  } else if (targetElement.className === 'unavailable') {
                      targetElement.className = '';
                      targetElement.disabled = false;
                  }
              });
          },          
            runGoogleAnalytics(eventName, action, label) {
                this.$ga.set({ dimension2: Date.now() });
                this.$ga.event(eventName, action, label);
            },
            toggleMapInfoBox() {
                !this.isFirstClick ? this.isAboutMapInfoBoxOpen = !this.isAboutMapInfoBoxOpen : null;
            },
            clickAnywhereToCloseMapInfoBox() {
                this.isAboutMapInfoBoxOpen = !this.isAboutMapInfoBoxOpen;
                this.isFirstClick = false;
            },
            contentToggle(elementToToggle) {
              elementToToggle.style.display === 'block' ? elementToToggle.style.display = 'none' : elementToToggle.style.display = 'block';
            },
            createLayerButtons(elementIds, idsOfButtonsOffWhenPageFirstLoads, elementTarget, googleAnalytics) {
              const map = this.$store.temperaturePredictionMap;

              elementIds.forEach(function(elementId) {
                  let mapLayerButton = document.createElement('a');
                  mapLayerButton.href = '#';
                  mapLayerButton.id = `${elementId.replace(/\s/g, '')}-button`; // Note, Element IDs cannot have white space, so let's remove (replace) any that is there
                  // If the layer is not set to visible when first loaded, then do not mark it as active.
                  // In other words, if the layer is not visible on page load, make the button look like the layer is toggled off
                  idsOfButtonsOffWhenPageFirstLoads.includes(elementId) ? mapLayerButton.className = '' : mapLayerButton.className = 'active';
                  mapLayerButton.textContent = elementId; // Set the wording (label) for the layer toggle button to match the 'elementId' listed in the style sheet
                  mapLayerButton.onclick = function(e) {  // Creates a click event for each button so that when clicked by the user, the visibility property is changed as is the class (color) of the button
                      googleAnalytics('layers-menu', 'click', 'user clicked ' + elementId);
                      let clickedLayer = this.textContent;
                      let clickedLayerParent = this.parentElement;
                      let clickedLayerParentKids = clickedLayerParent.children;
                      const visibility = map.getLayoutProperty(clickedLayer, 'visibility');
                      e.preventDefault();
                      e.stopPropagation();

                      if (visibility === 'visible' && !this.classList.contains('unavailable')) {
                          map.setLayoutProperty(clickedLayer, 'visibility', 'none');
                          this.className = '';
                      } else if (!this.classList.contains('unavailable')) {
                          // We don't want the user to have more than one Flow Detail layer showing at time, so we need to turn off any Flow Detail layers before loading a new one.
                          if (clickedLayerParent.id === 'streams') {
                              clickedLayerParentKids.forEach(function(kid) {
                                  if (!kid.classList.contains('unavailable')) { // Don't change anything if the button is unavailable (leave it unavailable)
                                      kid.className = '';
                                      map.setLayoutProperty(kid.innerHTML, 'visibility', 'none');
                                  }
                              });
                          }
                          this.className = 'active';
                          map.setLayoutProperty(clickedLayer, 'visibility', 'visible');
                      }
                  };
                  let layerToggleList = document.getElementById(elementTarget);
                  layerToggleList.appendChild(mapLayerButton);
              });
          },
          createLayerMenu() {
              const self = this;

              let correctDiv = document.getElementById('map');
              let mapLayersToggleContainer = document.createElement('div');
              let toggleOptions = document.createElement('div');
              let toggleTitleContainer = document.createElement('div');
              let toggleTitle = document.createElement('div');
              let toggleExit = document.createElement('div');
              let exitIcon = document.createElement('span');
              exitIcon.innerHTML = icon({ prefix: 'fas', iconName: 'times' }).html;
              let mapLayers = document.createElement('div');
              let streams = document.createElement('div');
              //Add ids and classes
              mapLayersToggleContainer.id = 'mapLayersToggleContainer';
              toggleTitleContainer.id = 'toggleTitleContainer';
              toggleTitleContainer.className = 'layersTitle';
              toggleTitle.id = 'toggleTitle';
              toggleExit.id = 'toggleExit';
              toggleOptions.id = 'toggleOptions';
              mapLayers.id = 'mapLayers';
              mapLayers.className = 'options';

              toggleTitle.innerHTML = 'Map Options';
              mapLayersToggleContainer.style.display = 'none';

              toggleExit.appendChild(exitIcon);
              toggleTitleContainer.appendChild(toggleTitle);
              toggleTitleContainer.appendChild(toggleExit);
              toggleOptions.appendChild(mapLayers);
              mapLayersToggleContainer.appendChild(toggleTitleContainer);
              mapLayersToggleContainer.appendChild(toggleOptions);
              correctDiv.appendChild(mapLayersToggleContainer);

              mapLayersToggleContainer.onclick = function(e){
                  e.stopPropagation();
              };
              toggleExit.onclick = function(e){
                  e.stopPropagation();
                  self.contentToggle(mapLayersToggleContainer);
              };
              document.body.onclick = function(){
                  if(mapLayersToggleContainer.style.display === 'block'){
                      self.contentToggle(mapLayersToggleContainer);
                  }
              };
          },
          getIdListFromStyleLayersBasedOnTargetProperty(styleLayers, targetPropertyFromStylesheet) {
              let layerIds = [];

              styleLayers.forEach(function(layer) {
                  if (layer[targetPropertyFromStylesheet]) {
                      layerIds.push(layer.id);
                  }
              });
              return layerIds
          },
          getSortedIdsForLayersOffWhenPageLoads(styleLayers, targetPropertyFromStylesheet) {
              let layerIds = [];

              styleLayers.forEach(function(layer) {
                  if (layer[targetPropertyFromStylesheet] && layer.layout.visibility === 'none') {
                      layerIds.push(layer.id);
                  }
              });
              return layerIds;
          },
          populateLayerMenuGroupsAndButtons(googleAnalytics) {
              const styleLayers =  Object.values(mapStyles.style.layers);
              const toggleableLayerIds = this.getIdListFromStyleLayersBasedOnTargetProperty(styleLayers, 'showButtonLayerToggle');
              const layersTurnedOffAtStart = this.getSortedIdsForLayersOffWhenPageLoads(styleLayers, 'showButtonLayerToggle');

              this.createLayerButtons(toggleableLayerIds, layersTurnedOffAtStart, 'mapLayers',  googleAnalytics);
          },
            onMapLoaded(event) {
                this.$store.temperaturePredictionMap = event.map; // The 'event' gives us access to the map as an object but only after the map has loaded. Once we have that, we add the map object to the Vuex store
                const map = this.$store.temperaturePredictionMap;
                let googleAnalytics = this.runGoogleAnalytics; // We need to get the global Google Analytics (GA) plugin object 'this.$ga' into this scope, so let's make a local variable and assign our GA event tracking method to that.
                map.resize(); //This solves the mysterious whitespace by resizing the map to the correct size.
                map.touchZoomRotate.enable(); // Allow users to pinch to zoom on touch devices.
                map.touchZoomRotate.disableRotation(); // Disable the rotation functionality, but keep pinch to zoom.
                map.fitBounds([[-125.3321, 23.8991], [-65.7421, 49.4325]]); // Once map is loaded, zoom in a bit more so that the map neatly fills the screen.
                setTimeout(() => { this.isLoading = false; }, 200);// Set a timeout to make sure the fitbounds action is completely done before loading screen fades away.
                map.on('zoomend', this.addZoomLevelIndicator); // Add the current zoom level display. The zoom level should only show in 'development' versions of the application.
                this.createLayerMenu();
                this.populateLayerMenuGroupsAndButtons(googleAnalytics);
                document.body.classList.remove("stop-scrolling");
                map.on('click','temp_gages', function (e) {
                  let coordinates = e.features[0].geometry.coordinates.slice();
                  let description = e.features[0].properties.SITE_NO;
                  let imgURL = "https://waterdata.usgs.gov/nwisweb/graph?agency_cd=USGS&site_no=";
                  let paramCD = "&parm_cd=00010&period=7";
                  while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                  }
                  let graph = "<img src='" + imgURL + description + paramCD +"'/>";
 
                new mapboxgl.Popup()
                  .setLngLat(coordinates)
                  .setHTML(graph)
                  .setMaxWidth("none")
                  .addTo(map);
                });
            }
        }
    };
</script>

<style scoped lang='scss'>
  @import '~mapbox-gl/dist/mapbox-gl.css';
  $color: #fff;
  $blue: #4574a3;
  $border: 1px solid #fff;
  $borderGray: 1px solid rgb(100, 100, 100);
  $background: rgba(255, 255, 255, 0.9);

#temperature_viz_container {
  #overlay {
    position: fixed; /* Sit on top of the page content */
    display: none; /* Hidden by default */
    width: 100%; /* Full width (cover the whole page) */
    height: 100%; /* Full height (cover the whole page) */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5); /* Black background with opacity */
    z-index: 2; /* Specify a stack order in case you're using a different order for other elements */
    cursor: pointer; /* Add a pointer on hover */
  }
  .header-container {
    background-color: #fff;
    .usa-prose {
      border-bottom: $borderGray;
      display: flex;
      h1 {
        font-size: 1rem;
        margin-left: 10px;
        flex: 1;
      }
    }
  }

  /* Add a background color to the layer toggle bar */
  #mapbox_component-layer-toggle {
    background-color: $blue;
    overflow: hidden;
    display: flex;
  }

  #iconToggleContainer {
    display: flex;
    width: 120px;
    border-left: $border;
    a {
      flex: 1;
      background: #00264c;
      margin: 0;
      color: $color;
    }

    a.active{
      background: #00bf26
    }

    .icon {
      &:nth-child(2){
        border-left: $border;
      }
    }
  }

  #layers,
  #streams{
    display: none;
  }

  #mapContainer {
    position: relative;
    flex: 1;
    min-height: 550px;
    display: flex;
    flex-direction: column;
  }

  #mapgl-water-temperature-mapbox-map{
    flex: 1;
  }

  .zoom-in-selection-controls {
    display: flex;
    color: white;
    background-color: #003366;
    padding-right: 0.25em;
    .zoom-in-selection-title {
      flex: 1;
      font-weight: bold;
      text-align: left;
      padding: 0.5em;
    }
    .zoom-in-region-subset {
      flex: 4;
      align-content: center;
      display: flex;
      span {
        padding: 0.5em;
        text-align: center;
      }
      button {
        margin: 2px 0 2px 0;
        flex: 1;
      }
    }
  }

/*  added for testing */
  .color-box {
    padding: 0 1em 0 1em;
    border: 1px solid black;
  }
  .color-ramp-controls {
    display: flex;
    button {
      text-align: center;
      flex: 1;
    }
  }
}
  @media screen and (min-width: 600px) and (min-height: 850px) {
    #temperature_viz_container {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
  }
</style>
<style lang="scss">
.loader {
  top: 107px;
  height: 100%;
}
  $color: #fff;
  $blue: #4574a3;
  $border: 1px solid rgb(200, 200, 200);
  $background: rgba(255, 255, 255, 0.9);

  .loader {
    top: 127px;
    height: 75%;
  }

  #mapLayersToggleContainer {
    background: $background;
    border-right: $border;
    width: 90%;
    height: 100%;
    position: absolute;
    z-index: 9000;

    a{
      outline: none;
    }
  }

  #toggleTitleContainer {
    display: flex;
    border-bottom: $border;
  }

  .layersTitle{
    height: 35px;
    padding: 0 0 0 10px;
    line-height: 35px;
    font-size: 1.4em;
    background: #003366;
    color: #fff;
  }

  .mapboxgl-popup {
    max-width: 800px;
    font: 12px/20px 'Helvetica Neue', Arial, Helvetica, sans-serif;
  }

  #toggleTitle {
    flex: 1;
  }

  #toggleExit {
    width: 35px;
    height: 35px;
    text-align: center;
    border-left: $border;
    cursor: pointer;

    &:hover{
      background: #00bf26;
      color: #fff;
    }

    svg {
      width: 20px;
      height: 20px;
      margin: 6px 0 0 0;
    }
  }

  #toggleOptions {
    min-height: 75px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .options {
    display: flex;
    flex-direction: column;
    a {
      padding: 10px;
      border-bottom: $border;
      text-decoration: none;
      font-size: 1em;
      color: #000;
      background: #f5f7fb;
      &:hover {
        background: #00bf26;
        color: #fff;
        opacity: 1;
      }
    }
    .active {
      background: #003366;
      opacity: .7;
      color: #fff;
    }

    .unavailable {
      background: #7f8da3;
      opacity: .7;
      color: #a0aec4;
    }
  }

  @media screen and (min-width: 960px){
    #mapLayersToggleContainer{
      width: 25%;
      max-width: 500px;
      height: auto;
      max-height: 100%;
      overflow-y: auto;
    }
  }
</style>