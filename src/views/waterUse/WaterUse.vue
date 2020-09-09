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
      <LoadingScreenInternal />
      <div
        id="buttonsContainer"
        class="centeredContent"
      >
        <div id="buttonExplanation" class="explanation">
          <p>Click on water use type to look at annual patterns.</p>
        </div>
        <button @click="useButtonClick($event)" id="te" class="waterUseButton">Thermoelectric</button>
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
        useParemeter: "te",
        season: "spring"
      }
    },
    mounted(){
      let self = this;
      document.body.classList.remove("stop-scrolling");
      setTimeout(function(){
        this.isLoading = false;
        self.addSeasonClass();
      }, 100)
    },
    methods: {
      changeSeason(event){
        this.season = event.target.id;
        console.log(event.target.id);
        console.log(this.svg, this.useParemeter, this.season);
        this.svg = "svg_map_" + this.useParemeter + "_" + this.season;
        console.log(this.svg, this.useParemeter, this.season);
        this.checkForClass();
        if(this.season === "winter"){
          this.winterSolution();
        }else{
          event.target.classList.add("activeSeason");
        }
      },
      useButtonClick(event){
        let self = this;
        this.useParemeter = event.target.id;
        this.svg =  "svg_map_" + this.useParemeter + "_" + this.season;
        this.barchart = "svg_bars_"  + this.useParemeter;
        setTimeout(function(){
          self.addSeasonClass();
        }, 10)
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
      addSeasonClass(){
        let element = document.getElementById(this.season);
        console.log(element)
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
      checkForClass(){
        let activeClasses = document.querySelectorAll(".activeSeason");
        activeClasses.forEach(function(activeClass){
          if(activeClass){
            activeClass.classList.remove("activeSeason")
          }else{
            return;
          }
        })
      }
    }
  }
</script>

<style lang="scss">
.loader {
  top: 107px;
  height: 100%;
}
.disabled{
  opacity: .3;
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
    border: none;
    font-size: 11pt;
    &:last-child{
      margin-right: 0;
    }
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
path.wu-dots{
  stroke: #0080FF;
  stroke-linecap: round;
  opacity: 0.6;
}
#waterUseBarChartContainer{
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