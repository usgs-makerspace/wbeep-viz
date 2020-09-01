<template>
  <div
    id="dataDateContainer"
    class="subtitle"
  >
    <div class="subtitleText">
      <p v-if="this.$route.name==='waterStorage' || this.$route.name==='waterTemperature'">Showing Latest Available Data: <span class="nowrap"><strong>{{ dataDate }}</strong></span></p>
      <p v-if="this.$route.name==='waterUse'">Showing Data for all of <span class="nowrap"><strong>2015</strong></span></p>
    </div>
  </div>
</template>
<script>
    export default {
        name: "MapAvailableDataDate",
        data() {
            return {
                dataDate: "unavailable"
            };
        },
        mounted() {
            // If we can get a URL, try to get the date the water storage model data was received and add it to the component data
            if (process.env.VUE_APP_DATA_DATE_URL && this.$route.name==='waterStorage') {
                fetch(process.env.VUE_APP_DATA_DATE_URL)
                        .then(response => {
                            if (!response.ok) { throw Error(response.statusText + ' The call to retrieve the model date has failed.') }
                            return response
                        })
                        .then(response => response.text())
                        .then(data => this.dataDate = data);
            }
            // water temperature model data date 
            if (process.env.VUE_APP_TEMP_DATA_DATE_URL && this.$route.name==='waterTemperature') {
                fetch(process.env.VUE_APP_TEMP_DATA_DATE_URL)
                        .then(response => {
                            if (!response.ok) { throw Error(response.statusText + ' The call to retrieve the model date has failed.') }
                            return response
                        })
                        .then(response => response.text())
                        .then(data => this.dataDate = data);
            }
        }
    }

</script>
<style scoped lang="scss">
  .subtitle {
    background: rgb(255, 255, 255);
    background: rgba(255, 255, 255, 0.8);
    margin-top: 10px;
    z-index: 1;
    border-radius: 5px;
    display: flex;
    flex-direction: row;
    text-align: center;
    border: 1px solid rgb(200, 200, 200);

    p {
      margin: 0;
      user-select: none;
      font-size: .75em;
    }

    .nowrap{
      white-space: pre;
    }

    .subtitleText {
      flex: 1;
      line-height: 20px;
      padding: 2px;
    }
  }
  @media screen and (min-width: 600px) {
  .subtitle {
    p {
      font-size: 0.8em;
    }
  }
}
</style>
