<template>
  <div id="aboutContainer">
    <WorkInProgressWarning />
    <div id="aboutContent">
      <h2><strong>Water Availability Mapper:</strong> Water Storage, Water Temperature, Water Use</h2>
      <div class="application" id="waterStorage">
        <h3>Water Storage</h3>
        <img class="applicationImage" src="@/assets/images/about/storage.jpg"/>
        <p>
          Last year, on December 18, 2019, a research team that includes hydrologic modelers, software developers, 
          cloud specialists, and data visualization experts released the first application in a set of applications 
          that represent a national view of <router-link to="/water-storage">water availability</router-link> . While only a concept prototype, for the first time 
          the USGS began delivering a daily water storage product that integrates our active monitoring with continuous 
          modeling. The water storage application uses modeling to enhance our active monitoring network and provides 
          comprehensive reporting at more than 100,000 watershed units. The National <router-link to="/water-storage">water storage application</router-link> 
          compares current natural water storage to daily historical values. 
        </p>
        <p>
          To expand upon the current visualization of daily estimated water storage, the second and third deliverables 
          of the USGS IWAAs program are map-based displays of modeled daily stream temperatures, and modeled 2015 water 
          use estimates. Together, these three indicators provide water quality and availability summaries in response to 
          the <a href="https://www.whitehouse.gov/presidential-actions/presidential-memorandum-promoting-reliable-supply-delivery-water-west/" target="_blank">Presidential Memo on Water in the West</a>.
        </p>
      </div>
      <div class="application" id="waterTemp">
        <h3>Water Temperature</h3>
        <img class="applicationImage" src="@/assets/images/about/temp.jpg"/>
        <p>
          A new addition to the Water Availability mapper is a 
          <router-link to="/water-temperature">
            National Water temperature application
          </router-link>.  
          This application displays a near real-time indicator of daily-average water temperature for approximately 
          58,000 stream segments. These modeled results provide comprehensive spatial improvements and enhance the active 
          monitoring network of XX continuous temperature monitors currently operated by USGS. The daily model run requires 
          a summary of the weather (precipitation and temperature) for a complete day. A sequence of operations begin at midnight 
          starting with collecting observed weather data, using 
          <a href="https://pubs.er.usgs.gov/publication/tm6B7" target="_blank">
            Precipitation-Runoff Modeling System (PRMS)
          </a> 
          and SNTemp water temperature model to calculate estimates of natural water temperature, then sending those data from the Cloud 
          to the mapping application to update symbology for all stream segments.  This prototype application will be enhanced with new 
          modeling technologies in future releases that will increase predication accuracy and may increase the spatial representation 
          of data. 
        </p>
      </div>
      <div class="application" id="waterUse">
        <h3>Water Use</h3>
        <img class="applicationImage" src="@/assets/images/about/use.png"/>
        <p>
          The third application in the water availability application is the 
          <router-link to="/water-use">
            National water use application
          </router-link>.  
          Water Use data for each county and state were compiled from various sources (depending on the category 
          of use and the information available for each state) into annual total withdrawals representing 2015. 
          These annual data were downscaled both spatially and temporally to represent average daily values for 
          each watershed (12-digit hydrologic unit code) using methods that include reference to climate, 
          population and other parameters. Withdrawals are reported for nine categories of use, but these maps 
          show withdrawals for only thermoelectric power, irrigation, and public supply which make up more than 90% 
          of the total withdrawals in the U.S. (<a href="https://pubs.er.usgs.gov/publication/cir1441" target="_blank">Dieter and others, 2018</a>).  
          The accurate estimation of water use nationally at the HUC 12 watershed scale provides a consistent national source of water use data for the first time. 
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    import WorkInProgressWarning from "@/components/WorkInProgressWarning";
    export default {
        name: "About",
        components:{
          WorkInProgressWarning
        }
    }
</script>

<style scoped lang="scss">
  #aboutContainer{
    flex: 1;
  }
  #aboutContent{
    padding: 10px;
    max-width: 960px;
    margin:0 auto;
    h2{
      text-align: center;;
      font-weight: normal;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid #003366;
    }
    h3{
      font-size: 1.3em;
    }
  }
  a{
    text-decoration: none;
    color: #003366;
    font-weight: bold;
    outline: none;
    &:hover{
      text-decoration: underline;
    }
  }
  .application{
    min-height: 100px;
    margin-bottom: 20px;

    p{
      margin-top: 10px;
      line-height: 1.5em;
    }
  }
  @media screen and (min-width: 600px){
    .application{
      margin-bottom: 40px;
      img{
        width: 40%;
        float: left;
        margin-right: 10px;
      }
      p{
        font-size: 1.1em;
      }
    }
  }
</style>
