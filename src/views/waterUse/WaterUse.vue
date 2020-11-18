<template>
  <div 
    id="water-use-container"
    class="centeredContent waterUseFlex"
    @click.once="clickAnywhereToCloseMapInfoBox"
  >
    <WorkInProgressWarning />
    <div id="mapSubtitleContainer">
      <MapSubtitle 
        :is-about-map-info-box-open="isAboutMapInfoBoxOpen"
        @clickedInfoIcon="clickAnywhereToCloseMapInfoBox()"
        @clickedExit="toggleMapInfoBox()"
      />
      <router-link to="QuestionsAndAnswers">
        <div
          v-on:click="$store.commit('changeTabToBeOpened', 'Use')"
          id="waterUseQuestion"
        >
          <font-awesome-icon
            icon="question"
            class="icon-map-control-question"
          />
        </div>
      </router-link>
    </div>
    <div class="water-use-content">
      <LoadingScreenInternal :is-loading="isLoading" />
      <div
        id="buttonsContainer"
        class="centeredContent"
      >
        <div
          id="buttonExplanation"
          class="explanation"
        >
          <div class="instructionNumber">
            1
          </div>
          <p>First, select water use type (Spring season is the default view)</p>
        </div>
        <button
          id="te"
          class="waterUseButton activeParameter"
          @click="useButtonClick($event)"
        >
          Thermoelectric
        </button>
        <button
          id="ir"
          class="waterUseButton"
          @click="useButtonClick($event)"
        >
          Irrigation
        </button>
        <button
          id="ps"
          class="waterUseButton"
          @click="useButtonClick($event)"
        >
          Public Supply
        </button>
      </div>
    </div>
    <div id="waterUseMapContainer">
      <DynamicSVG
        id="dynamicSVG"
        :svg="svg"
      />
    </div>
    <div class="water-use-content">
      <div id="waterUseBarChartContainer">
        <div
          id="chartExplanation"
          class="explanation"
        >
          <div class="instructionNumber">
            2
          </div>
          <p>Next, select season</p> 
        </div>
        <DynamicBarChart
          :barchart="barchart"
          @click.native="changeSeason($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import LoadingScreenInternal from "../../components/LoadingScreenInternal";
  import WorkInProgressWarning from "../../components/WorkInProgressWarning";
  export default {
    name: 'WaterUse',
    components: {
        LoadingScreenInternal,
        MapSubtitle: () => import(/*webpackChunkName: "MapSubtitle"*/ "../../components/MapSubtitle"),
        DynamicSVG: () => import(/* webpackPrefetch: true */ /*webpackChunkName: "SVGMaps"*/ "../../components/DynamicSVG"),
        DynamicBarChart: () => import(/*webpackChunkName: "SVGBarChart"*/ "../../components/DynamicBarChart"),
        WorkInProgressWarning
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
        //Make sure the state is true
        if(this.$store.state.mapSVGRenderOnInitialLoad === true){
          setTimeout(function(){
            self.addSeasonClass();
            self.watchWuBarsHovers();
          },1000);
        }
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
        let winters = document.querySelectorAll("#winter");
        wuBarHovers.forEach(function(wuBarHover){
          let wuBar = wuBarHover.previousElementSibling;
          //Separate winter paths to give it different functionality
          if(wuBarHover.id === "winter"){
            wuBarHover.addEventListener("mouseover", function(){
              self.winterSolution("hover");
            });
            wuBarHover.addEventListener("mouseout", function(){
              self.winterSolution("hover");
            });
          }else{
            //If not winter do the usual mouse functionality
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
          }
        });
      },
      changeSeason(event){
        let checkClass = event.target.classList.contains("wu-bars-hover");
        let target = event.target;
        let className = document.querySelector(".activeSeason");
        if(checkClass){
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
        //Color the season diviiders the same as the seasons
        let dividers = document.querySelectorAll(".wu-season-dividers");
        dividers.forEach(function(divider){
          divider.style.stroke = document.querySelector(".activeSeason").style.fill;
        })
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
      winterSolution(hover){
        let self = this;
        let winters = document.querySelectorAll("#winter");
        winters.forEach(function(winter){
          let winterSibling = winter.previousElementSibling;
          //make sure its hover functionality
          if(hover){
            if(winter.classList.contains("winterHover")){
              winter.classList.remove("winterHover");
              winterSibling.style.fill = self.basicBarChunkColor;
              winterSibling.style.fillOpacity = 1;
            }else{
              winter.classList.add("winterHover");
              self.checkUseParameter(winterSibling);
              winterSibling.style.fillOpacity = .5;
            }
          }else{
            //Handle the click functionality
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
$mapBG:  rgb(209,211,212);
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
  font-weight: bold;
  display: flex;
  .instructionNumber{
    background: #003366;
    width: 25px;
    height: 25px;
    margin-right: 5px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2em;
    color: #fff;
  }
  p{
    margin: 0;
    font-size: 98%;
    line-height: 25px;
  }
}
#water-use-container {
  flex: 1;
  a{
    color: #000;
  }
}
.water-use-content{
  width: 100%;
  padding: 0 10px;
  max-width: 800px;
}
#mapSubtitleContainer{
  position: relative;
  width: 100%;
  height:78px;
}
#waterUseQuestion{
  position:absolute;
  top: 10px;
  right: 10px;
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
  width: 100%;
  max-width: 1500px;
  margin: 20px 0;
  position: relative;
  /*colors the SVG map*/
  #dynamicSVG{
    stroke: #fff;
    fill: $mapBG;
  }
  #waterUseLegend circle,
  #waterUseLegend path{
    stroke: #000;
  }
  #waterUseLegend circle.smallDot{
    stroke: none;
  }
  #waterUseLegend text{
    fill: #000;
    dominant-baseline: middle;
    stroke: none;
    font-size: 1em;
    text-anchor: end;
  }
  #waterUseLegend text.legendTitle{
    text-anchor: middle;
  }
  .teLegend circle{
    fill: $thermo;
  }
  .irLegend circle{
    fill: $irrigation;
  }
  .psLegend circle{
    fill: $publicSupply;
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
  margin-bottom: 20px;
  #barchartAxis{
    pointer-events: none;
  }
  #chartExplanation{
    margin: 0 0 10px 0;
  }
}
.wu-bars-hover{
  cursor: pointer;
  fill-opacity: 0;
  fill: #000;
  &:hover{
    fill-opacity: .1;
  }
}
.winterHover{
  fill-opacity: .1;
}
.wu-bars-axis{
  font-size: 1.3rem;
  stroke-linecap: square
}
.wu-bars{
  fill: $mapBG;
}
path.wu-bars-axis {
  stroke: rgb(100,100,100);
  stroke-width: 2;
}
.wu-season-dividers{
  stroke: $thermo;
  stroke-dasharray: 5;
}
.seasonLabel{
  font-size: 1.2em;
}
.monthLabel{
  fill: rgb(100,100,100);
}
@media screen and (min-width: 600px){
  #buttonsContainer{
    .waterUseButton{
      font-size: 14pt;
    }
  }
}
@media screen and (min-width: 1100px) and (min-height: 1400px){
  .water-use-content{
    max-width: 1100px;
  }
}
@media screen and (min-width: 1300px) and (max-height: 768px){
  .water-use-content{
    width: 650px;
  }
}
@media screen and (min-width: 1000px) and (max-height: 652px){
  .water-use-content{
    width: 530px;
  }
}
</style>