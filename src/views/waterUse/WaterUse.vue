<template>
  <div 
    id="water-use-container"
    class="centeredContent waterUseFlex"
    @click.once="clickAnywhereToCloseMapInfoBox"
  >
    <div id="mapSubtitleContainer">
      <MapSubtitle 
        :is-about-map-info-box-open="isAboutMapInfoBoxOpen"
        @clickedInfoIcon="clickAnywhereToCloseMapInfoBox()"
        @clickedExit="toggleMapInfoBox()"
      />
      <router-link to="QuestionsAndAnswers#waterUseSection">
        <div
          id="waterUseQuestion"
        >
          <font-awesome-icon
            icon="question"
            class="icon-map-control-question"
          />
        </div>
      </router-link>
    </div>
    <div
      id="water-use-content"
      class="waterUseFlex"
    >
      <LoadingScreenInternal :is-loading="isLoading" />
      <div
        id="buttonsContainer"
        class="centeredContent"
      >
        <div id="buttonExplanation" class="explanation">
          <p>Click on water use type to look at annual patterns.</p>
        </div>
        <button @click="useButtonClick($event)" id="te" class="waterUseButton activeParameter">Thermoelectric</button>
        <button @click="useButtonClick($event)" id="ir" class="waterUseButton">Irrigation</button>
        <button @click="useButtonClick($event)" id="ps" class="waterUseButton">Public Supply</button>
      </div>
      <div
        id="waterUseMapContainer"
      >
        <DynamicSVG :svg="svg" />
        <MapLegend :legend-title="legendTitle" :use-parameter="useParameter" />
      </div>
      <div
        id="waterUseBarChartContainer"
      >
        <div id="chartExplanation" class="explanation">
          <p>Click a season to look at seasonal use</p> 
        </div>
        <DynamicBarChart @click.native="changeSeason($event)" :barchart="barchart" />
      </div>
    </div>
  </div>
</template>

<script>
  import LoadingScreenInternal from "../../components/LoadingScreenInternal";
  import MapLegend from "../../components/MapLegend";
  export default {
    name: 'WaterUse',
    components: {
        LoadingScreenInternal,
        MapLegend,
        MapSubtitle: () => import(/*webpackChunkName: "MapSubtitle"*/ "../../components/MapSubtitle"),
        DynamicSVG: () => import(/* webpackPrefetch: true */ /*webpackChunkName: "SVGMaps"*/ "../../components/DynamicSVG"),
        DynamicBarChart: () => import(/*webpackChunkName: "SVGBarChart"*/ "../../components/DynamicBarChart")
    },
    data() {
      return {
        title: process.env.VUE_APP_TITLE,
        titleSuffix: process.env.VUE_APP_TITLE_SUFFIX,
        featureName: 'Water Use',
        developmentTier: process.env.VUE_APP_TIER,
        isLoading: true,
        isAboutMapInfoBoxOpen: true,
        isFirstClick: true,
        legendTitle: 'Water Use',
        svg: "svg_map_te_spring",
        barchart: "svg_bars_te",
        legend: "thermo",
        useParameter: "te",
        season: "spring",
        teColor: "#D54C1A",
        irColor: "#2B594E",
        psColor: "#446FA6",
        basicBarChunkColor: "rgb(209,211,212)"
      }
    },
    computed: {
      checkIfSVGMapIsRendered() {
        return this.$store.state.mapSVGRenderOnInitialLoad;
      }
    },
    watch: {
      checkIfSVGMapIsRendered(newState, oldState){
        let self = this;
        setTimeout(function(){
          self.addSeasonClass();
          self.watchWuBarsHovers();
        },300);
      }
    },
    mounted(){
      let self = this;
      if(this.$store.state.mapSVGRenderOnInitialLoad === true){
        setTimeout(function(){
          self.addSeasonClass();
          self.watchWuBarsHovers();
        },300);
      }
    },
    methods: {
      addSeasonClass(){
        let element = document.getElementById(this.season);
        if(this.season === "winter"){
          this.winterSolution();
        }else{
          element.previousElementSibling.classList.add("activeSeason");
          this.changeWuBarFill();
        }
        this.isLoading = false;
      },
      watchWuBarsHovers(){
        let self = this;
        let wuBarHovers = document.querySelectorAll(".wu-bars-hover");
        wuBarHovers.forEach(function(wuBarHover){
          let wuBar = wuBarHover.previousElementSibling;
          wuBarHover.addEventListener("mouseover", function(){
            //Make sure wuBar is not the active class
            if(!wuBar.classList.contains("activeSeason")){
              self.checkUseParameter(wuBar);
              wuBar.style.fillOpacity = .5;
            }
          });
          wuBarHover.addEventListener("mouseout", function(){
            //Make sure wuBar is not the active class
            if(!wuBar.classList.contains("activeSeason")){
              wuBar.style.fill = self.basicBarChunkColor;
              wuBar.style.fillOpacity = 1;
            }
          });
        });
      },
      changeSeason(event){
        let checkClass = event.target.classList.value;
        let target = event.target;
        let className = document.querySelector(".activeSeason");
        if(checkClass === "wu-bars-hover"){
          this.season = target.id;
          //Update SVG map by season
          this.svg = "svg_map_" + this.useParameter + "_" + this.season;
          this.checkForClass("activeSeason");
          if(this.season === "winter"){
            this.winterSolution();
          }else{
            this.addSeasonClass();
          }
        }
      },
      useButtonClick(event){
        let self = this;
        let button = event.target;
        //update useParameter
        this.useParameter = event.target.id;
        //concat to change svg map
        this.svg =  "svg_map_" + this.useParameter + "_" + this.season;
        //concat to change svg barchart
        this.barchart = "svg_bars_"  + this.useParameter;
        //check to see if class exists and remove it
        this.checkForClass("activeParameter");
        //add class to new button
        button.classList.add("activeParameter");
        setTimeout(function(){
          self.addSeasonClass();
          //wubarhovercolorsolution
          self.watchWuBarsHovers();
          self.$root.$emit('SwapLegendIcon');
        }, 100);
      },
      changeWuBarFill(){
        let self = this;
        let activeSeasons = document.querySelectorAll(".activeSeason");
        activeSeasons.forEach(function(activeSeason){
          self.checkUseParameter(activeSeason);
          activeSeason.style.fillOpacity = 1;
        });
      },
      checkUseParameter(element){
        //Find out which parameter is in use and color elements accordingly
        let self = this;
        switch(self.useParameter){
          case "te":
            element.style.fill = self.teColor;
            break;
          case "ir":
            element.style.fill = self.irColor;
            break;
          case "ps":
            element.style.fill =  self.psColor;
            break;
        }
      },
      winterSolution(){
        let winters = document.querySelectorAll(".wu-bars-hover");
        winters.forEach(function(winter){
          let winterSibling = winter.previousElementSibling;
          if(winter.id === "winter"){
            winterSibling.classList.add("activeSeason");
          }
        });
        this.changeWuBarFill();
      },
      checkForClass(className){
        let self = this;
        let activeClasses = document.querySelectorAll("." + className);
        activeClasses.forEach(function(activeClass){
          if(activeClass){
            activeClass.style.fill = self.basicBarChunkColor;
            activeClass.classList.remove(className)
          }
        })
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
      }
    }
  }
</script>

<style lang="scss">
$thermo: #D54C1A;
$irrigation: #2B594E;
$publicSupply: #446FA6;
$mapBG: rgb(220,220,220);
$highlight: #68C6A4;
$barChartHighlight: red;
.loader {
  top: 107px;
  height: 100%;
}
.waterUseFlex{
  display: flex;
  flex-direction: column;
}
.centeredContent{
  align-items: center;
  justify-content: center;
}
.explanation{
  width: 100%;
  text-align: center;
  font-weight: bold;
  p{
    margin: 0;
    font-size: 98%;
  }
}
#water-use-container {
  flex: 1;
  padding: 0 10px;
  a{
    color: #000;
  }
}
#water-use-content{
  width: 100%;
  max-width: 800px;
  flex: 1;
  display: flex;
}
#mapSubtitleContainer{
  position: relative;
  width: 100%;
  height:78px;
}
#waterUseQuestion{
  position:absolute;
  top: 10px;
  right: 0px;
  width: 29px;
  height: 29px;
  display: block;
  padding: 0;
  outline: none;
  border: 0;
  box-sizing: border-box;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 0 0 2px rgba(0,0,0,.1);
  cursor: pointer;
  text-align: center;
  svg{
    width: 18px;
    height: 18px;
    margin: 4px 1px 0 0;
  }
}
#buttonsContainer{
  display: flex;
  margin: 20px 0 0 0;
  flex-wrap: wrap;
  #buttonExplanation{
    margin-bottom: 10px;
  }
  .waterUseButton{
    flex: 1;
    background: #fff;
    border-radius: 5px;
    margin-right: 10px;
    height: 35px;
    font-size: 11pt;
    font-weight: bold;
    outline: none;
    cursor: pointer;
    &:last-child{
      margin-right: 0;
    }
  }
  #te{
    color: $thermo;
    border: 2px solid $thermo;
    &:hover{
      color: #fff;
      background: $thermo;
    }
  }
  #ir{
    color: $irrigation;
    border: 2px solid $irrigation;
    &:hover{
      color: #fff;
      background: $irrigation;
    }
  }
  #ps{
    color: $publicSupply;
    border: 2px solid $publicSupply;
    &:hover{
      color: #fff;
      background: $publicSupply;
    }
  }
  #te.activeParameter{
    color: #fff;
    background: $thermo;
  }
  #ir.activeParameter{
    color: #fff;
    background: $irrigation;
  }
  #ps.activeParameter{
    color: #fff;
    background: $publicSupply;
  }
}
#waterUseMapContainer{
  margin: 20px 0;
  position: relative;
  /*colors the SVG map*/
  svg{
    stroke: $mapBG;
    fill: #fff;
  }
  #legendContainer{
    min-height: 10px;
    position: absolute;
    left: 0;
    bottom: 0;
  }
}
.wu-dots-te,
.wu-dots-ir,
.wu-dots-ps{
  stroke-linecap: round;
  opacity: 0.6;
}
.wu-dots-te{
  stroke: $thermo;
}
.wu-dots-ir{
  stroke: $irrigation;
}
.wu-dots-ps{
  stroke: $publicSupply;
}
#waterUseBarChartContainer{
  #barchartAxis{
    pointer-events: none;
  }
  #chartExplanation{
    margin: 5px 0 20px 0;
  }
}
.wu-bars-hover{
  cursor: pointer;
  fill-opacity: 0;
}
.wu-bars-axis{
  font-size: 1.3rem;
}
.wu-bars{
  fill: rgb(209,211,212);
}
path.wu-bars-axis {
  stroke: black;
  stroke-width: 5;
}
.seasonLabel{
  font-size: 1.2em;
}
@media screen and (min-width: 600px){
  #buttonsContainer{
    .waterUseButton{
      font-size: 14pt;
    }
  }
}
@media screen and (min-width: 1300px) and (max-height: 768px){
  #water-use-content{
    width: 650px;
  }
}
@media screen and (min-width: 1000px) and (max-height: 652px){
  #water-use-content{
    width: 530px;
  }
}


</style>