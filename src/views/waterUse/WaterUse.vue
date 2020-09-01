<template>
  <div
    id="water-use-container"
    class="centeredContent waterUseFlex"
  >
    <MapSubtitle 
      :is-about-map-info-box-open="isAboutMapInfoBoxOpen"
      @clickedInfoIcon="toggleMapInfoBox()"
      @clickedExit="toggleMapInfoBox()"
    />
    <div
      id="water-use-content"
      class="waterUseFlex"
    >
      <LoadingScreenInternal />
      <div
        id="buttonsContainer"
        class="centeredContent"
      >
        <button class="waterUseButton">
          Thermoelectric
        </button>
        <button class="waterUseButton">
          Irrigation
        </button>
        <button class="waterUseButton">
          Public Supply
        </button>
      </div>
      <div
        id="waterUseMapContainer"
        class="bordered"
      >
        Map
        <router-link to="/water-use/questions-answers">
          <div
            id="waterUseQuestion"
            class="icon-map-control-question"
          >
            <font-awesome-icon icon="question" />
          </div>
        </router-link>
      </div>
      <div
        id="waterUseBarChartContainer"
        class="bordered"
      >
        BarChart
      </div>
    </div>
  </div>
</template>

<script>
  import LoadingScreenInternal from "../../components/LoadingScreenInternal";
  import MapSubtitle from "../../components/MapSubtitle";

  export default {
    name: 'WaterUse',
    components: {
        LoadingScreenInternal,
        MapSubtitle
    },
    data() {
      return {
        title: process.env.VUE_APP_TITLE,
        titleSuffix: process.env.VUE_APP_TITLE_SUFFIX,
        featureName: 'Water Use',
        developmentTier: process.env.VUE_APP_TIER,
        isLoading: true,
        isAboutMapInfoBoxOpen: true
      }
    },
    mounted(){
      let self = this;
      setTimeout(function(){
        this.isLoading = false;
      }, 100)
    },
    methods: {
      runGoogleAnalytics(eventName, action, label) {
        this.$ga.set({ dimension2: Date.now() });
        this.$ga.event(eventName, action, label);
      },
      toggleMapInfoBox() {
        !this.isFirstClick ? this.isAboutMapInfoBoxOpen = !this.isAboutMapInfoBoxOpen : null;
      },
    }
  }
</script>

<style lang="scss">
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
.bordered{
  border: 1px solid #000;
  padding: 10px;
}
#water-use-container {
  flex: 1;
  padding: 0 10px;
  position: relative;
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
#buttonsContainer{
  height: 40px;
  display: flex;
  margin: 90px 0 20px 0;
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
  flex: 2;
  margin: 20px 0;
  position: relative;
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

#waterUseBarChartContainer{
  flex: 1;
}

@media screen and (min-width: 600px){
  #buttonsContainer{
    .waterUseButton{
      font-size: 16pt;
    }
  }
}


</style>