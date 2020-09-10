<template>
  <div
    id="water-use-container"
    class="centeredContent waterUseFlex"
    @click.once="clickAnywhereToCloseMapInfoBox"
  >
    <div id="mapSubtitleContainer">
      <MapSubtitle 
        :is-about-map-info-box-open="isAboutMapInfoBoxOpen"
        @clickedInfoIcon="toggleMapInfoBox()"
        @clickedExit="toggleMapInfoBox()"
      />
    </div>
    <div
      id="water-use-content"
      class="waterUseFlex"
    >
      <LoadingScreenInternal v-if="checkIfSVGMapIsRendered" />
      <div
        id="buttonsContainer"
        class="centeredContent"
      >
        <div id="buttonExplanation" class="explanation">
          <p>Click on water use type to look at annual patterns.</p>
        </div>
        <button @click="useButtonClick($event)" id="te" class="waterUseButton activeParameter">Thermoelectric</button>
        <button @click="useButtonClick($event)" id="ir" class="waterUseButton">Irrigation</button>
        <button @click="useButtonClick($event)" id="publicSupply" class="waterUseButton disabled" disabled>Public Supply</button>
      </div>
      <div
        id="waterUseMapContainer"
      >
        <DynamicSVG :svg="svg" />
        <router-link to="/water-use/questions-answers">
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
        id="waterUseBarChartContainer"
      >
        <DynamicBarChart @click.native="changeSeason($event)" :barchart="barchart" />
        <div id="chartExplanation" class="explanation">
          <p>Choose a season to look at seasonal use</p> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import LoadingScreenInternal from "../../components/LoadingScreenInternal";
  import MapSubtitle from "../../components/MapSubtitle";
  import DynamicSVG from "../../components/DynamicSVG";
  import DynamicBarChart from "../../components/DynamicBarChart";

  export default {
    name: 'WaterUse',
    components: {
        LoadingScreenInternal,
        MapSubtitle,
        DynamicSVG,
        DynamicBarChart
    },
    data() {
      return {
        title: process.env.VUE_APP_TITLE,
        titleSuffix: process.env.VUE_APP_TITLE_SUFFIX,
        featureName: 'Water Use',
        developmentTier: process.env.VUE_APP_TIER,
        isLoading: true,
        isAboutMapInfoBoxOpen: true,
        svg: "svg_map_te_spring",
        barchart: "svg_bars_te",
        useParameter: "te",
        season: "spring"
      }
    },
    computed: {
      checkIfSVGMapIsRendered() {
        console.log("Water Use Function");
        return this.$store.state.mapSVGRenderOnInitialLoad;
      }
    },
    mounted(){
      let self = this;
      document.body.classList.remove("stop-scrolling");
      setTimeout(function(){
        self.addSeasonClass();
      }, 100)
    },
    methods: {
      changeSeason(event){
        this.season = event.target.id;
        //Update SVG map by season
        this.svg = "svg_map_" + this.useParameter + "_" + this.season;
        this.checkForClass("activeSeason");
        if(this.season === "winter"){
          this.winterSolution();
        }else{
          event.target.classList.add("activeSeason");
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
        }, 10)
      },
      addSeasonClass(){
        let element = document.getElementById(this.season);
        if(this.season === "winter"){
          this.winterSolution();
        }else{
          element.classList.add("activeSeason");
        }
      },
      winterSolution(){
        let winters = document.querySelectorAll(".wu-bars-hover");
        winters.forEach(function(winter){
          if(winter.id === "winter"){
            winter.classList.add("activeSeason");
          }
        });
      },
      checkForClass(className){
        let activeClasses = document.querySelectorAll("." + className);
        activeClasses.forEach(function(activeClass){
          if(activeClass){
            activeClass.classList.remove(className)
          }else{
            return;
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
$thermo: #EFC458;
$irrigation: #00A08F;
$highlight: #1C4755;
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
  p{
    margin: 0;
    font-size: 100%;
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
#buttonsContainer{
  display: flex;
  margin: 20px 0 0 0;
  flex-wrap: wrap;
  #buttonExplanation{
    margin-bottom: 10px;
  }
  .waterUseButton{
    flex: 1;
    background: #000;
    color: #fff;
    border-radius: 5px;
    margin-right: 10px;
    height: 40px;
    border: 1px solid #fff;
    font-size: 11pt;
    outline: none;
    &:last-child{
      margin-right: 0;
    }
    &:hover{
      opacity: 1;
      border: 2px solid #1C4755;
    }
  }
  .disabled{
    opacity: .3;
    pointer-events: none;
  }
  #te{
    background: $thermo;
  }
  #ir{
    background: $irrigation;
  }
  .activeParameter{
    border: 2px solid #1C4755;
  }
}
#waterUseMapContainer{
  margin: 20px 0;
  position: relative;
  padding-top: 20px;
}
#waterUseQuestion{
  position:absolute;
  top: 0px;
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
.wu-dots{
  stroke: $thermo;
  stroke-linecap: round;
  opacity: 0.6;
}
#waterUseBarChartContainer{
  svg{
    overflow: visible;
  }
  .wu-bars-hover{
    fill-opacity: 0;
    &:hover, &:focus{
      fill: yellow;
      fill-opacity: .5;
    }
  }
  .activeSeason{
    fill: yellow;
    fill-opacity: .5;
  }
  #winterGroup .wu-bars{
    fill: #52A5D9
  }
  #springGroup .wu-bars{
    fill: #2AA617
  }
  #summerGroup .wu-bars{
    fill: #347307;
  }
  #fallGroup .wu-bars{
    fill: #D95204;
  }
  .wu-bars-axis {
    font-size: 20px;
  }
  path.wu-bars-axis {
    stroke: black;
    stroke-width: 5;
  }
  .wu-bars-hover {
    opacity: 0.2;
  }
  #chartExplanation{
    margin: 5px 0 20px 0;
  }
}
@media screen and (min-width: 600px){
  #buttonsContainer{
    .waterUseButton{
      font-size: 16pt;
    }
  }
}
</style>