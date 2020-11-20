<template>
  <div id="subtitleInfoModal">
    <div id="infoContainer">
      <div id="subtitleModalExit">
        <a
          id="exit"
          href="javascript:void(0);"
          aria-label="close more information box"
          class="icon"
          @click="$emit('clickedExit')"
        >
          <font-awesome-icon icon="times" />
        </a>
      </div>
      <h2>About This Map</h2>
      <p v-if="currentFeature === 'waterStorage'">
        This is a <strong>demonstration map and is not for decision making</strong>. It shows the latest available modeled daily estimates of natural water storage for approximately 110,000 regions or Hydrologic Response Units across the lower forty-eight U.S. states. Natural water storage includes water present on the landscape such as standing water (ponds, lakes, and wetlands), and water in snowpack, soil water, and shallow groundwater. It does not include water in rivers, reservoirs, or deep groundwater. Map shading indicates the current natural water storage relative to historical conditions for this time of year.
      </p>
      <div v-if="currentFeature === 'waterTemperature'">
        <p>
          This is a <strong>demonstration map and is not for decision making</strong>. It shows the latest available daily estimates of natural water temperature for approximately 58,000 stream reaches across the lower forty-eight states. Water temperature is one factor of overall water quality due to its impact on aquatic habitat. Streams naturally have different temperatures depending on how big they are, where they are located, and the time of year. However, there are also external forces such as thermoelectric power plants that may change a stream's temperature and impact aquatic life or the usability of the stream for other purposes.  
        </p>
      </div>
      <div v-if="currentFeature === 'waterUse'">
        <p>
          This is a <strong>demonstration map and is not for decision making</strong>. The maps contains modeled estimates of each season's average daily water use rate-of-withdrawal for approximately 85,000 watersheds during 2015. These daily estimates of thermoelectric, public supply, and irrigation water uses are derived from monthly 2015 estimates of water withdrawals from surface and groundwater sources. Withdrawals do not reflect water consumed and/or returned. Original modeled data are available for 12-digit hydrologic unit code (HUC) watersheds, that were aggregated to larger 10-digit HUC for ease of display at a National scale. The locations of dots on the map do not necessarily represent the exact location of the withdrawals.
        </p>
      </div>
      <router-link
        v-if="currentFeature === 'waterStorage'"
        to="/questionsandanswers"
      >
        <button
          v-ga="$ga.commands.trackName.bind(this, 'button-subtitle', 'click', 'user went to questions and answers page')"
        >
          Learn More
        </button>
      </router-link>
      <router-link
        v-if="currentFeature === 'waterUse'"
        to="/questionsandanswers#waterUseSection"
      >
        <button
          v-ga="$ga.commands.trackName.bind(this, 'button-subtitle', 'click', 'user went to questions and answers page')"
        >
          Learn More
        </button>
      </router-link>
      <router-link
        v-if="currentFeature === 'waterTemperature'"
        to="/questionsandanswers#waterTempSection"
      >
        <button
          v-ga="$ga.commands.trackName.bind(this, 'button-subtitle', 'click', 'user went to questions and answers page')"
        >
          Learn More
        </button>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "SubTitleModal",
  data() {
    return {
      currentFeature: this.$route.name
    }
  }
};
</script>
<style scoped lang="scss">
#subtitleInfoModal {
  min-height: 30px;
  margin-top: 10px;
  border-radius: 5px;
  border: 1px solid rgb(200, 200, 200);
  background: rgb(255, 255, 255);
  background: rgba(255, 255, 255, 0.95);

  #infoContainer {
    min-height: 20px;
    position: relative;
    padding: 5px 10px 0 10px;
    font-size: 0.9em;
    text-align: center;

    #subtitleModalExit{
      text-align: right;
      position: absolute;
      right: 5px;
      top: 5px;
    }

    #exit {
      display: inline-block;
      width: 25px;
      height: 100%;
      color: #000;
      cursor: pointer;
      outline: none;
      text-align: center;

      svg {
        height: 18px;
        width: 18px;
        margin: 3px 0 0 0;
      }
    }

    p {
      text-align: left;
      margin: 0 0 10px 0;
    }

    h2 {
      font-size: 1.2em;
      font-weight: bold;
      padding: 0;
      margin: 30px 0 10px 0;
    }

    button {
      margin: 0 0 10px 0;
      background: #003366;
      color: #ffffff;
      border: none;
      outline: none;
      padding: 5px 10px;
      border-radius: 5px;
      font-size: 0.9em;
      font-weight: bold;
    }
  }
}

@media screen and (min-width: 360px){
    // #subtitleInfoModal{
    //   top: 70px;
    // }
  }
</style>
