<template>
  <div id="aboutContainer">
    <WorkInProgressWarning />
    <div id="aboutContent">
      <h1>National Integrated Water Availability Assessments (IWAAs)</h1>
      <h2><strong>Water Availability Mapper:</strong> Water Storage, Water Temperature, Water Use</h2>
      <div class="application" id="waterStorage">
        <h3>Water Storage</h3>
        <img class="applicationImage" src="@/assets/images/about/storage.jpg"/>
        <p>
          In 2019, a research team that includes hydrologic modelers, software developers, cloud specialists, 
          and data visualization experts released the first application in a set of applications that represent 
          a national view of <router-link to="/">water availability</router-link>. While only a concept prototype, for the first time the USGS began 
          delivering a daily water storage product that integrates our active monitoring with continuous modeling. 
          The <router-link to="/">water storage application</router-link> provides comprehensive reporting at more than 100,000 watershed units. The 
          National water storage application compares current natural water storage to daily historical values.
        </p>
        <p>
          To expand upon the current visualization of daily estimated water storage, the second and third deliverables 
          of the USGS IWAAs program are map-based displays of modeled daily stream temperatures and modeled 2015 water 
          use estimates. Together, these three indicators provide water quality and availability summaries in response 
          to the <a href="https://www.whitehouse.gov/presidential-actions/presidential-memorandum-promoting-reliable-supply-delivery-water-west/" target="_blank" @click="runGoogleAnalytics('About Page', 'click', 'clicked Presidential Memo on Water in the West')">Presidential Memo on Water in the West</a>.
        </p>
      </div>
      <div class="application" id="waterTemp">
        <h3>Water Temperature</h3>
        <img class="applicationImage" src="@/assets/images/about/temp.jpg"/>
        <p>
          <router-link to="/water-temperature">National stream temperature application</router-link> displays a near real-time indicator of daily-average water temperature 
          for approximately 58,000 stream segments. These modeled results provide comprehensive spatial improvements and 
          enhance the active monitoring network of over 2,000 continuous temperature monitors currently operated by USGS. 
          Water temperature models are run using 
          <a href="https://pubs.er.usgs.gov/publication/tm6B7" target="_blank" @click="runGoogleAnalytics('About Page', 'click', 'clicked Precipitation-Runoff Modeling System (PRMS)')">
            Precipitation-Runoff Modeling System (PRMS)
          </a>
          and SNTemp stream temperature model to calculate estimates of natural water temperature. The activities needed to obtain input data, model temperatures, 
          and update the visualizations require a complex ‘operational pipeline’ in the Cloud
        </p>
      </div>
      <div class="application" id="waterUse">
        <h3>Water Use</h3>
        <img class="applicationImage" src="@/assets/images/about/use.png"/>
        <p>
          Third, the <router-link to="/water-use">National water use application</router-link> provides a consistent national source of water use data.  
          Water Use data for each county and state were compiled from various sources (depending on the category 
          of use and the information available for each state) into annual total withdrawals for the year 2015. 
          These annual data were downscaled both spatially and temporally to represent average daily values for each 
          watershed (12-digit hydrologic unit code) using methods that include reference to climate, population and 
          other parameters. Withdrawals are compiled for nine categories of use, but 90% of the total withdrawals in 
          the U.S are depicted in these maps of withdrawals for  thermoelectric power, irrigation, and public supply 
          <a href="https://pubs.er.usgs.gov/publication/cir1441" target="_blank" @click="runGoogleAnalytics('About Page', 'click', 'clicked Dieter and others, 2018')">
          (Dieter and others, 2018).
          </a>  
        </p>
      </div>
      <div class="application" id="operationalPipeline">
        <h3>Operational Pipeline</h3>
        <p>
          In order to update the water storage and water temperature applications for near-real time conditions, an 
          operational pipeline was implemented in the Cloud. The major steps in the operational pipeline include: 
          1) obtaining and formatting the underlying spatial datasets, 2) obtaining and formatting gridded climate inputs for modeling, 
          3) hydrologic model execution, 4) post-processing of model outputs, and 5) updating the water storage and water temperature 
          visualizations. A containerized workflow has been implemented for this process to allow for modularization and flexibility of 
          various components, as well as allowing for efficient troubleshooting. Each container in the workflow, as shown in the accompanying 
          diagram, executes a specific, independent, task.
        </p>
        <div id="diagram">
          <pipelineDiagram />
        </div>
        <p>
          The basemap geospatial data in the applications are formatted, stored, and updated as needed in the Cloud. Different 
          containers are used to receive the geospatial data sets
          <a href="https://doi.org/10.5066/P971JAGF" target="_blank" @click="runGoogleAnalytics('About Page', 'click', 'clicked Bock et. al, 2020')"> 
          (Bock et. al, 2020)
          </a>, re-format them into GeoJSON, and convert 
          into vector tiles which are stored in the Cloud for use in the visualization.
        </p>
        <p>
          To produce the daily-updating modeled water storage or temperature estimates, a series of actions are completed in 
          containers in the Cloud.  The first container checks to see if the climate inputs of daily maximum and minimum air 
          temperature and precipitation accumulation from the GridMET dataset 
          <a href="https://doi.org/10.1002/joc.3413" target="_blank" @click="runGoogleAnalytics('About Page', 'click', 'clicked Abatzoglou, 2013')"> 
          (Abatzoglou, 2013) 
          </a>
          have been updated for the 
          latest complete day. The second container downloads the climate inputs and processes the data from their native grid 
          to the model spatial units using a contributing area-weighted averaging algorithm. The third container executes the 
          hydrologic model using the initial conditions (restart file) from the previous model run and the updated climate data. 
          The fourth container re-runs the model and updates the initial conditions files for the next time that the model is executed.  
          The model simulations are extracted and stored in the Cloud.    
        </p>
        <p>
          The last few containers access the stored model simulation results and update the visualizations of water storage and water 
          temperature. This part of the pipeline combines (joins) the spatial vector tile data with the latest model simulation results 
          and places these data-infused tiles back into the Cloud. For water storage, the latest model simulation results are compared 
          to all historic results to bin the data into quantiles. After the model simulation completes, these actions are triggered on a 
          daily-basis to update the vector tile data with the latest available model simulation results. Finally, the vector tiles are 
          visualized within the web application.  
        </p>
      </div>
      <div class="application" id="disclaimer">
        <h3>Disclaimer</h3>
        <p>
          <em>Any use of trade, firm, or product names is for descriptive purposes only and does not imply endorsement by the U.S. Government.</em>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
    import WorkInProgressWarning from "@/components/WorkInProgressWarning";
    import pipelineDiagram from "@/assets/images/about/pipelinesdiagram-01.svg";
    export default {
        name: "About",
        components:{
          WorkInProgressWarning,
          pipelineDiagram
        },
        methods:{
          runGoogleAnalytics(eventName, action, label) {
              this.$ga.set({ dimension2: Date.now() });
              this.$ga.event(eventName, action, label);
          },
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
    h1,h2{
      text-align: center;
    }
    h2{
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
      line-height: 2em;
    }
  }
  @media screen and (min-width: 600px){
    .application{
      margin-bottom: 40px;
      img{
        width: 30%;
        float: left;
        margin-right: 10px;
      }
      p{
        font-size: 1.1em;
      }
    }
  }
</style>
