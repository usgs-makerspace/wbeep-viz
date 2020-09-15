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
      <LoadingScreenInternal v-if="!isLoading" />
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
  export default {
    name: 'WaterUse',
    components: {
        LoadingScreenInternal,
        MapSubtitle: () => import(/*webpackChunkName: "MapSubtitle"*/ "../../components/MapSubtitle"),
        DynamicSVG: () => import(/* webpackPrefetch: true */ /*webpackChunkName: "SVGMaps"*/ "../../components/DynamicSVG"),
        DynamicBarChart: () => import(/*webpackChunkName: "SVGBarChart"*/ "../../components/DynamicBarChart"),
    },
    data() {
      return {
        title: process.env.VUE_APP_TITLE,
        titleSuffix: process.env.VUE_APP_TITLE_SUFFIX,
        featureName: 'Water Use',
        developmentTier: process.env.VUE_APP_TIER,
        isLoading: this.$store.state.mapSVGRenderOnInitialLoad,
        isAboutMapInfoBoxOpen: true,
        svg: "svg_map_te_spring",
        barchart: "svg_bars_te",
        useParameter: "te",
        season: "spring"
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
        },200);
      }
    },
    methods: {
      changeSeason(event){
        let checkClass = event.target.classList.value;
        if(checkClass === "wu-bars-hover"){
          this.season = event.target.id;
          //Update SVG map by season
          this.svg = "svg_map_" + this.useParameter + "_" + this.season;
          this.checkForClass("activeSeason");
          if(this.season === "winter"){
            this.winterSolution();
          }else{
            event.target.classList.add("activeSeason");
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
$thermo: #E6B348;
$irrigation: #2B594E;
$publicSupply: #446FA6;
$mapBG: rgb(200,200,200);
$winter: steelBlue;
$spring: khaki;
$summer: green;
$fall: orange; 
$highlight: #68C6A4;
$barChartHighlight: rgb(100,100,100);
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
    background: #fff;
    border-radius: 5px;
    margin-right: 10px;
    height: 40px;
    font-size: 11pt;
    font-weight: bold;
    outline: none;
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
  padding-top: 20px;
  svg{
    stroke: $mapBG;
    fill: #fff;
  }
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
  .wu-bars-hover{
    cursor: pointer;
    fill-opacity: 0;
    &:hover, &:focus{
      fill: $barChartHighlight;
      fill-opacity: .3;
    }
  }
  #barchartAxis{
    pointer-events: none;
  }
  .wu-bars-axis{
    font-size: 1.3rem;
  }
  .activeSeason{
    fill: $barChartHighlight;
    fill-opacity: .3;
  }
  #winterGroup .wu-bars{
    fill: $winter;
  }
  #springGroup .wu-bars{
    fill: $spring;
  }
  #summerGroup .wu-bars{
    fill: $summer;
  }
  #fallGroup .wu-bars{
    fill: $fall;
  }
  path.wu-bars-axis {
    stroke: black;
    stroke-width: 5;
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