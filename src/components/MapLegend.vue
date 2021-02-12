<template>
  <div id="legendContainer">
    <div
      v-show="!hidden"
      id="tabs"
    >
      <div
        id="minimizeTab"
        class="tab"
      >
        <a
          id="legendMinimize"
          class="tabIcon"
          aria-label="close legend dialog box"
          @click="runGoogleAnalytics('legend', 'click', 'user reduced legend'), legendToggle()"
        >
          <font-awesome-icon icon="angle-down" />
        </a>
      </div>
      <div
        v-if="currentFeature === 'waterStorage'"
        id="infoTab"
        class="tab"
      >
        <a
          id="legendInfoButton"
          class="tabIcon"
          aria-label="open information dialog box"
          @click="runGoogleAnalytics('legend', 'click', 'user clicked info icon'), modalToggle()"
        >
          <font-awesome-icon
            v-if="!infoShowing"
            icon="info"
          />
          <font-awesome-icon
            v-else
            icon="list"
          />
        </a>
      </div>
    </div>
    <div
      v-show="!hidden && !infoShowing"
      id="legend"
    >
      <div id="legendTitle">
        <p>{{ legendTitle }}</p>
      </div>
      <div id="keysAndText" />
    </div>
    <LegendModal
      v-show="infoShowing && !hidden"
      @clickedX="modalToggle()"
    />
    <div
      v-show="hidden"
      id="collapsedLegend"
    >
      <div id="collaspedLegendText">
        <p>Legend</p>
      </div>
      <div id="collapsedLegendIcon">
        <a
          id="legendPlus"
          class="legendIcon"
          aria-label="close extended legend box"
          @click="runGoogleAnalytics('legend', 'click', 'user expanded legend'), legendToggle()"
        >
          <font-awesome-icon icon="angle-left" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import mapStyles from "../assets/mapStyles/waterStorage/mapStyles";
import LegendModal from "./LegendModal";

export default {
  name: "MapLegend",
  components:{
    LegendModal
  },
  props: {
    legendTitle: {
      type: String,
      default: "Add your title for the legend in MapBox.vue or make this blank"
    },
    useParameter: {
      type: String,
      default: "te"
    }
  },
  data() {
    return {
      legend: null,
      hidden: false,
      infoShowing: false,
      currentFeature: this.$route.name,
      waterUseParameter: this.useParameter
    };
  },
  mounted() {
    if(this.currentFeature === "waterStorage"){
      this.createWaterStorageLegend();
    }else if(this.currentFeature === "waterTemperature"){
      this.createWaterTempLegend();
    }
    this.$root.$on("SwapLegendIcon", () => {
      this.SwapLegendIcon();
    });
  },
  methods: {
    runGoogleAnalytics(eventName, action, label) {
      this.$ga.set({ dimension2: Date.now() });
      this.$ga.event(eventName, action, label);
    },
    legendToggle(){
      this.hidden = !this.hidden;
    },
    modalToggle(){
      this.infoShowing = !this.infoShowing;
    },
    createWaterStorageLegend() {
      // get the style layers from the map styles object
      let styleLayers = mapStyles.style.layers;
      let legendColorValues = [];
      let styleSheetCategories = [];
      let selectedLayerStyle = null;
      // look through the styles layers to find the one with the Hydrological Response Unit fill colors
      for (let index = 0; index < styleLayers.length; index++) {
        if (styleLayers[index].id === "HRUs") {
          // save the layer style we want, so we can use it later
          selectedLayerStyle = styleLayers[index];
          // Get the fill color values and names then put them in separate lists
          let styleSheetColorStops =
            styleLayers[index].paint["fill-color"].stops;
          let styleSheetColorLabel = null;
          for (let index = 0; index < styleSheetColorStops.length; index++) {
            // Make a label for the blank and missing data

            styleSheetColorLabel = styleSheetColorStops[index][0];
            legendColorValues.push(styleSheetColorStops[index][1]);
            styleSheetCategories.push(styleSheetColorLabel);
          }
        }
      }

      let legend = this.legend;
      legend = document.getElementById("keysAndText");

      for (let index = 0; index < styleSheetCategories.length; index++) {
        let legendMainText = styleSheetCategories[index];
        let color = legendColorValues[index];
        let item = document.createElement("div");
        let keyContainer = document.createElement("div");
        let textContainer = document.createElement("div");
        let key = document.createElement("div");
        let value = document.createElement("div");

        item.style.minHeight = "20px";
        item.style.display = "flex";

        keyContainer.style.flex = 1;

        textContainer.style.flex = 1;

        key.style.backgroundColor = color;
        key.style.height = "25px";

        value.style.fontSize = ".85em";
        value.style.userSelect = "none";
        value.style.lineHeight = "25px";
        value.style.paddingLeft = "10px";
        value.innerHTML = selectedLayerStyle.legendText[legendMainText][0];

        keyContainer.appendChild(key);
        textContainer.appendChild(value);
        item.appendChild(keyContainer);
        item.appendChild(textContainer);
        legend.appendChild(item);
      }
    },
    createWaterTempLegend(){
      const keys = document.getElementById("keysAndText");
      const colorsHTML = `
        <div id="mainContainer">
          <div id="mainContainerContent">
            <div id="legendColorTemps">
              <div class="legendColorTemp">
                  <div id="legendColorTemp1" class="colorBlock"></div>
                  <div id="topTemp" class="temp">
                    <div class="celsius">
                      25-30&#8451;
                    </div>
                    <div class="bar">|</div>
                    <div class="fahrenheit">
                      77-86&#8457;
                    </div>
                  </div> 
              </div>
              <div class="legendColorTemp">
                  <div id="legendColorTemp2" class="colorBlock"></div>
                  <div id="secondHot" class="temp">
                    <div class="celsius">
                        18-24&#8451;
                    </div>
                    <div class="bar">|</div>
                    <div class="fahrenheit">
                        64-75&#8457;
                    </div>
                  </div> 
              </div>
              <div class="legendColorTemp">
                  <div id="legendColorTemp3" class="colorBlock"></div>
                  <div id="middleTemp" class="temp">
                    <div class="celsius">
                          12-17&#8451;
                      </div>
                      <div class="bar">|</div>
                      <div class="fahrenheit">
                          53-63&#8457;
                      </div>
                  </div> 
              </div>
              <div class="legendColorTemp">
                  <div id="legendColorTemp4" class="colorBlock"></div>
                  <div id="firstLower" class="temp">
                    <div class="celsius">
                          6-11&#8451;
                      </div>
                      <div class="bar">|</div>
                      <div class="fahrenheit">
                          43-52&#8457
                      </div>
                  </div> 
              </div>
              <div class="legendColorTemp">
                  <div id="legendColorTemp5" class="colorBlock"></div>
                  <div id="bottomTemp" class="temp">
                    <div class="celsius">
                        0-5&#8451;
                    </div>
                    <div class="bar">|</div>
                    <div class="fahrenheit">
                        32-41&#8457;
                    </div>
                  </div> 
              </div>
            </div>
          </div>
        </div>
      ` 
      const siteHTML = `
        <div id="siteContainer">
          <div class="siteDot"></div>
          <div id="siteDotText">
            USGS monitoring station
          </div>
        </div>
      `
      keys.insertAdjacentHTML("beforeend", colorsHTML);
      keys.insertAdjacentHTML("beforeend", siteHTML);
    },
    SwapLegendIcon(){
      this.waterUseParameter = this.useParameter;
    }
  }
};
</script>

<style scoped lang="scss">
$border: 1px solid rgb(200, 200, 200);
$background: rgb(255, 255, 255);
$borderRadius: 5px;
$fontSizeMobile: 0.8em;
$fontSizeDesktop: 0.9em;
$arrowHeight: 21px;
$arrowWidth: 21px;
$buttonColorActive: #003366;
$buttonActiveTextColor: #fff;

#legendContainer {
  display: flex;
  min-height: 20px;
  min-width: 100px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 1000;
  p{
    margin:0;
  }
  a{
    display: inline-block;
    width:100%;
    height: 100%;
    text-align: center;
    cursor: pointer;
  }
}
#legend{
  background: $background;
  border: $border;
  border-radius: $borderRadius 0 $borderRadius $borderRadius;
  overflow: hidden;
  font-size: .85em;
}
#collapsedLegend{
  display: flex;
  border: $border;
  background: $background;
  border-radius: $borderRadius;
  overflow: hidden;
}
#collaspedLegendText{
  flex: 1;
  padding: 5px 5px;
  font-size:.9em;
}
#collapsedLegendIcon{
  width: 25px;
  border-left: $border;
  a{
    &:active{
      background: $buttonColorActive;
      color: $buttonActiveTextColor;
    }
    svg{
      height: $arrowHeight;
      width: $arrowWidth;
      margin: 3px 0 0 0;
    }
  }
}
#tabs {
  align-self: flex-start;
  width: 25px;
  order: 2;
  background: $background;
  border-radius: 0 $borderRadius $borderRadius 0;
  border-top: $border;
  border-right: $border;
}
#tabs,
#collapsedLegendIcon
{
  a{
    &:hover{
      background: $buttonColorActive;
      color: $buttonActiveTextColor;
    }
  } 
}
.tab {
  height: 30px;
}
.tabIcon {
  display: inline-block;
  width: 100%;
  height: 100%;
  text-align: center;
  cursor: pointer;
  &:active {
    background: $buttonColorActive;
    color: $buttonActiveTextColor;
  }
  svg {
    margin: 7px 0 0 0;
  }
}
#legendMinimize{
  border-bottom: $border;
  svg{
    height: $arrowHeight;
    width: $arrowWidth;
    margin: 4px 0 0 0;
  }
}
#legendTitle {
  padding: 0 5px;
  border-bottom: $border;
  height: 30px;
  line-height: 30px;
  p {
    font-size: 0.9em;
  }
}
</style>
<style lang="scss">
/*#########TEMP LEGEND#########*/
#mainContainer{
  
  padding: 5px 10px;
}
#legendColorTemps{
  padding: 5px 0;
}
.legendColorTemp{
  display: flex;
  margin-bottom: 2px;
  align-items: center;
  &:last-child{
    margin-bottom: 0;;
  }
}
.colorBlock{
  min-height: 20px;
  width: 30px;
  margin: 2px 5px 0 0;
  border-radius: 2px;
}
#legendColorTemp5{
  background-color: #10305d;
}
#legendColorTemp4{
  background-color: #6a798a;
}
#legendColorTemp3{
  background-color: #c4c1b6;
}
#legendColorTemp2{
  background-color: #9c615b;
}
#legendColorTemp1{
  background-color:#730000;
}

.temp{
  flex: 1;
  display: flex;
  margin-top: 2px;
  .celsius,
  .fahrenheit{
    flex: 1;
  }
  .celsius{
    text-align: right;
  }
  .bar{
    width: 5px;
    margin:0 5px;
    // text-align: center;
  }
}
#siteContainer{
  display: flex;
  padding:0 10px 10px 10px;
  align-items: center;
  .siteDot{
    background: #000000;
    width:6px;
    height: 6px;
    border-radius: 5px;
    border: 1px solid #000000;
    margin-right: 5px;
  }
}
</style>
