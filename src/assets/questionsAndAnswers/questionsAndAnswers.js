export default {
    pageContents: {
        title: "Got Questions? We're Here to Provide Answers. ",
        introText: "So you have a question about the National Integrated Water Availability Assessments (IWAAs) map, but you don't see it listed here? No problem!",
        waterStorageAccordionSections: [
            {
                "sectionTitle": "About the Water Storage Map",
                "questionsAndAnswers": [
                    {
                        "id": "storageQuestion1",
                        "question": "What does this map show me?",
                        "answer": "The " + process.env.VUE_APP_TITLE + " shows the latest available daily estimate of natural water storage for approximately 110,000 regions or Hydrologic Response Units (HRUs, <a\n"+
                        "href=\"https://doi.org/10.5066/P971JAGF\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for Bock et al. 2020')\"\n" +                        
                        ">Bock et al. 2020</a>) across the lower forty-eight states. Map shading indicates the current natural water storage relative to historical conditions for this time of year."
                    },
                    {
                        "id": "storageQuestion2",
                        "question": "What does “Concept Map” mean, and why aren’t these data available here for decision making? ",
                        "answer": "The data presented within the IWAAs water availability series of maps demonstrate a new USGS capability for calculating near real-time estimates of water budget variables.  The process (or concept) behind the data acquisition, modeling, and delivery of water temperature or water storage data throughout the lower 48 states are orchestrated using an operational pipeline in the Cloud (See About tab for more information).  While the models used for these calculations are complex and verified (" +
                        "<a href='https://doi.org/10.5066/P9NM8K8W' " + 
                        "target='_blank' " + 
                        "@click='runGoogleAnalytics('QA page', 'click', 'clicked reference for Hay 2019, Sanders et. al, 2017')' " +
                        ">Hay 2019, Sanders et. al, 2017</a>), the operational pipeline delivery and display capability was the focus of this work.  For those reasons, data are displayed so that the range of values may be observed, but the actual predictions are not available for download, and we discourage policy or decision making from these data at the present time.  In the future operational models with decision-ready data downloading will be a functionality."
                    },
                    {
                       "id": "storageQuestion3",
                       "question": "What is the meaning of \"natural water storage\"?",
                       "answer": "Natural water storage shown here includes water present on the landscape such as standing water (ponds, lakes, and wetlands), and water on trees, snowpack, soil water, and shallow groundwater. It does not include water in rivers or deep groundwater."
                    },
                    {
                        "id": "storageQuestion4",
                        "question": "Why is the \"latest available\" map not for today?",
                        "answer": "The latest model run requires a summary of the weather (precipitation and temperature) for a complete day. A sequence of operations begin at midnight starting with collecting observed weather data and ending several hours later with estimates of natural water storage and an updated map. For this reason, depending on the time of day relative to the latest update, the date at the top of the map will be yesterday or the day before yesterday. If the date is more than two days ago, that is an indication that some part of the update operations did not run successfully and the team is working to bring the system back online."
                    },
                    {
                        "id": "storageQuestion5",
                        "question": "What is being highlighted when I move my mouse on the map?",
                        "answer": "Highlighted modeling units or regions are called Hydrologic Response Units (HRUs, <a\n"+
                        "href=\"https://doi.org/10.5066/P971JAGF\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for Bock et al. 2020')\"\n" +                               
                        ">Bock et al. 2020</a>). Each watershed is broken up into these regions in order to estimate the daily natural water storage. The units are based on the area that flows to the left or right side of a river between an upstream and downstream location."
                    },
                    {
                        "id": "storageQuestion6",
                        "question": "How can I see a previous day’s natural water storage value for my region?",
                        "answer": "There is not currently a way for users to view maps for previous days. In the future, this may be a capability."
                    },
                    {
                        "id": "storageQuestion7",
                        "question": "I live in Hawaii, why do I not see any natural water storage data there?",
                        "answer": "The model used currently only has the data it needs in order to calculate daily natural water storage for the lower forty-eight states. In the future, the goal is to expand the model to include Hawaii, Alaska and Puerto Rico."
                    },
                    {
                        "id": "storageQuestion8",
                        "question": "How can I print or save this map?",
                        "answer": "No specific features are built into this web site to print or save images at this time, but you can use those available in your web browser to save the image locally (In the Menu, look for Save As, which may give you options to save the HTML or PDF). Alternatively, you can use your computer’s screen capture capabilities to grab a screenshot of the map image and paste it into a local image editor to save it (for example, paste it into Microsoft Paint on a Windows computer)."
                    },
                    {
                        "id": "storageQuestion9",
                        "question": "Will there be improvements to this map in the future?",
                        "answer": "Yes! This is the first iteration of a USGS product that displays a near real-time indicator of water availability across the lower forty-eight states. Future plans include additional indicators of near real-time water availability (beyond natural water storage), as well as predictions of future water availability. If you’re interested in contributing ideas or learning more, please reach out to       <a\n" +
                        "href=\"mailto:gs-w_onhm@usgs.gov?subject=IWAAs Ideas or Contribution\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked gs-w_onhm@usgs.gov email link')\"\n" +
                        ">gs-w_onhm@usgs.gov</a>"
                    }
                ]
            },
            {
                "sectionTitle": "Deep in the Science for Water Storage",
                "questionsAndAnswers": [
                    {
                        "id": "storageDeepScience1",
                        "question": "How are the categories for availability determined?",
                        "answer": "Over 30 years of data were used to calculate percentiles for natural water storage for each modeling unit. When looking at today’s value for a region compared to over 30 years of data for that region: \n" +
                                "<ul>\n" +
                                "<li>\"Very High\" means that today’s value is greater than 90% of all historic values for that region,</li>\n" + 
                                "<li>\"High\" means that the value is greater than 75% of all historic values,</li>\n" +
                                "<li>\"Normal\" means that the value is greater than 25% but less than 75% of all historic values,</li>\n" +
                                "<li>\"Low\" means that the value is lower than 75% of all historic values for the region, and</li>\n" +
                                "<li>\"Very Low\" means that the value is lower than 90% of all historic values for the region.</li></ul>"
                    },
                    {
                        "id": "storageDeepScience2",
                        "question": "Where does the " + process.env.VUE_APP_TITLE + " map get the data it is representing?",
                        "answer": "<p>\n" +
                                "Estimates of natural water storage are calculated using the National Hydrologic Model (NHM) Infrastructure (<a\n" +
                                "href=\"https://doi.org/10.1016/j.envsoft.2018.09.023\"\n" +
                                "target=\"_blank\"\n" +
                                "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text reference for Regan et al. 2019')\"\n" +
                                ">Regan et al. 2019</a>)\n" +
                                "configured with the <a\n" +
                                "href=\"https://www.usgs.gov/software/precipitation-runoff-modeling-system-prms\"\n" +
                                "target=\"_blank\"\n" +
                                "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text link for precipitation-runoff-modeling-system-prms')\"\n" +
                                ">Precipitation Runoff Modeling\n" +
                                "System</a> (PRMS; <a\n" +
                                "href=\"https://doi.org/10.3133/tm6B7\"\n" +
                                "target=\"_blank\"\n" +
                                "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text reference for Markstrom et al. 2015')\"\n" +
                                ">Markstrom et al., 2015).</a>\n" +
                                "The <a\n" +
                                "href=\"http://www.climatologylab.org/gridmet.html\"\n" +
                                "target=\"_blank\"\n" +
                                "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text link for gridMET')\"\n" +
                                ">gridMET</a> daily weather dataset is used to force both historical and latest-available model runs (<a\n"+
                                "href=\"https://doi.org/10.1002/joc.3413\"\n" +
                                "target=\"_blank\"\n" +
                                "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text reference for Abatzoglou 2013')\"\n" +
                                ">Abatzoglou, 2013</a>). The PRMS is a modular, deterministic, distributed-parameter, physical process-based hydrologic simulation code that can be used to evaluate the effects of various combinations of climate and landscape on hydrologic response at the watershed scale  (<a\n"+
                                "href=\"https://doi.org/10.3133/tm6B9\"\n" +
                                "target=\"_blank\"\n" +
                                "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text reference for Regan et al. 2018')\"\n" +
                                ">Regan et al., 2018</a>). The PRMS application of the NHM (NHM-PRMS) is used here to represent the daily water balance across the diverse range of landscapes of the lower forty-eight states. Further information on the NHM Infrastructure, the PRMS model, and the NHM-PRMS application can be found in the references below.\n" +
                                "</p>"
                    },
                    {
                        "id": "storageDeepScience3",
                        "question": "Why was \"natural water storage\" used as an indicator of water availability?",
                        "answer": "For the first phase of developing a national hydrologic model to indicate water availability across the lower forty-eight states, required modeling focused only on quantification of natural flows (without human modification from reservoirs and withdrawals). As the model matures, additional hydrologic parameters will be produced by the model (like human water use). Additional indicators of water availability will be included on this map to create a complete picture of water availability and quality."
                    },
                    {
                        "id": "storageDeepScience4",
                        "question": "Why would a region with a wetland or water body have a lower daily natural water storage than one without?",
                        "answer": "Even if a lake or wetland is in a region, the natural water storage could be considered low for those regions compared to their historic norms."
                    },
                    {
                        "id": "storageDeepScience5",
                        "question": "What are IWAAs?",
                        "answer": "<p>\n" +
                                "      The USGS Integrated Water Availability Assessments (IWAAs) are a multi-extent, stakeholder driven, near real-time census and seasonal prediction of water availability for both human and ecological uses at regional and national extents. The USGS IWAAs combine resources and knowledge gained from previous and ongoing USGS efforts such as Focus Area Studies, Regional Groundwater Availability Studies, Water Use estimation, Ecological Water Needs, and Streamflow estimation, in addition to utilizing and providing feedback to the National Water Model. The IWAAs are designed to provide information to meet the goals of the National Water Census as established through the <a href='https://www.congress.gov/bill/110th-congress/senate-bill/2156/text?r=5&s=1' target='_blank'>SECURE Water Act</a>." +
                                "    </p>"
                    }
                ]
            }
        ],
        waterUseAccordionSections: [
            {
                "sectionTitle": "About the Water Use Map",
                "questionsAndAnswers": [
                    {
                        "id": "useQuestion1",
                        "question": "What does this map show me?",
                        "answer": "The maps shows each season's average daily water use rate-of-withdrawal for each watershed during 2015 for thermoelectric, irrigation, and public supply categories of use. Original modeled data are available at watershed units or 12-digit hydrologic unit code (HUC), <a " + 
                        "href='https://www.usgs.gov/core-science-systems/ngp/national-hydrography/access-national-hydrography-products' " +
                        "target='_blank' " +
                        "@click='runGoogleAnalytics('about page', 'click', 'clicked reference for 12-digit hydrologic unit code (HUC) USGS 2014') " +
                        ">USGS 2014</a>" +
                        ", that were aggregated to larger 10-digit HUC for ease of display at a National scale.  The locations of dots on the map do not necessarily represent the exact location of the withdrawals."
                    },
                    {
                        "id": "useQuestion2",
                        "question": "What is the meaning of “water use” Thermoelectric, Irrigation, and Public Supply?",
                        "answer": "Water for thermoelectric power is used in the process of generating electricity with steam-driven turbine generators. Water for irrigation is withdrawn to supplement water needs for agricultural crops. Public supply refers to water withdrawn by public and private water suppliers that provide water to at least 25 people or have a minimum of 15 connections and is used mostly for domestic purposes but also serves other customers such as commercial and industrial establishments. (See <a\n" +
                        "href=\"https://doi.org/10.3133/cir1441\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for Dieter and others 2018')\"\n" +
                        ">Dieter and others, 2018</a> for more information)"
                    },
                    {
                        "id": "useQuestion3",
                        "question": "What is the difference between water withdrawal and water consumption? ",
                        "answer": "Water withdrawal is the total amount removed from a water source such as a river or an aquifer. Often, a portion of this water is returned to the source and is available to be used again. Water consumed is the portion of water that is removed and not returned to its source. For example, the amount of evapotranspiration caused by irrigating a crop is an example of the amount of water consumed."
                    },
                    {
                        "id": "useQuestion4",
                        "question": "Why are the data for 2015?",
                        "answer": "The USGS compiled water use estimates by individual counties and reported state totals most recently for 2015. These data were used to estimate water use shown in these maps. Future water use estimates will be made using models that are under development by the USGS, and these models will provide historical, current, and forecasted water use estimates."
                    },
                    {
                        "id": "useQuestion5",
                        "question": "How does the water use map relate to the daily bar chart? ",
                        "answer": "The water use map represents each season's average daily water use rate of withdrawal for each watershed (<a\n" +
                        "href=\"https://www.usgs.gov/core-science-systems/ngp/national-hydrography/access-national-hydrography-products\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for HUC/National Watershed Boundary Dataset 2014')\"\n" +
                        ">10-digit hydrologic unit code, USGS 2014</a>) in the lower 48-states.  The daily bar chart represents national daily water use for the selected water use category for each day of the year."
                    },
                    {
                        "id": "useQuestion6",
                        "question": "What is the spatial unit represented by each circle or dot on the map?",
                        "answer": "Each circle or dot on the map represents the water use referenced to the centroid of a watershed (<a\n" +
                        "href=\"https://www.usgs.gov/core-science-systems/ngp/national-hydrography/access-national-hydrography-products\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for HUC/National Watershed Boundary Dataset 2014')\"\n" +
                        ">10-digit hydrologic unit code, USGS 2014</a>) in the lower 48-states."
                    },
                    {
                        "id": "useQuestion7",
                        "question": "I live in Alaska, why don't I see any water use data there?",
                        "answer": "The water use data are estimated across the lower forty-eight states using geospatial analysis and temporal disaggregation methods, but the data needed for these methods are not available in Hawaii, Alaska and Puerto Rico. In the future, the goal is to expand the water use map to include Hawaii, Alaska and Puerto Rico."
                    },
                    {
                        "id": "useQuestion8",
                        "question": "Will there be improvements to this map in the future?",
                        "answer": "Yes. This water use map is part of a USGS product that displays multiple aspects of the water budget for all watersheds across the lower forty-eight states.  Future water use estimates will be made using models that are under development by the USGS, and these models will provide historical, current, and forecasted water use estimates. This map will be updated or used to develop new products for enhanced data delivery and visualization. If you’re interested in contributing ideas or learning more, please reach out to <a\n" +
                        "href=\"mailto:gs-w_onhm@usgs.gov?subject=IWAAs Ideas or Contribution\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked gs-w_onhm@usgs.gov email link')\"\n" +
                        ">gs-w_onhm@usgs.gov</a> or <a\n" +
                        "href=\"mailto:gs-w_wu-info@usgs.gov?subject=IWAAs Ideas or Contribution\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked gs-w_wu-info@usgs.gov email link')\"\n" +
                        ">gs-w_wu-info@usgs.gov</a> for specific water use ideas."
                    }
                ],
            },
            {
                "sectionTitle": "Deep in the Science for Water Use",
                "questionsAndAnswers": [
                    {
                        "id": "useDeepScience1",
                        "question": "What is the source of the data presented in the National Water Use Map?",
                        "answer": "Data for each county were compiled from various sources, depending on the category of use and the information available for each state, and compiled into annual total withdrawals. USGS personnel in each USGS Water Science Center used the best available sources of information in each state to compile measured data, and make estimates to fill gaps in reported data (<a\n" +
                        "href=\"https://doi.org/10.3133/cir1441\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for Dieter and others 2018')\"\n" +
                        ">Dieter and others, 2018</a>). These annual data were downscaled both spatially and temporally to represent average daily values for each watershed using geospatial analysis and temporal downscaling methods that include reference to climate, population and other parameters."
                    },
                    {
                        "id": "useDeepScience2",
                        "question": "What are the categories of water use?",
                        "answer": "Withdrawals are reported by category of use: public supply, domestic (including self-supplied domestic and deliveries from public supply), irrigation, self-supplied livestock, aquaculture, thermoelectric power, industrial, and mining, and self-supplied thermoelectric power. These maps show withdrawals for only thermoelectric power, irrigation, and public supply because these 3 categories make up more than 90% of the total withdrawals in the U.S. (<a\n"+
                        "href=\"https://doi.org/10.3133/cir1441\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for Dieter and others 2018')\"\n" +
                        ">Dieter and others, 2018</a>)."
                    }
                ]
            }
        ],
        waterTempAccordionSections: [
            {
                "sectionTitle": "About the Water Temperature Map",
                "questionsAndAnswers": [
                    {
                        "id": "tempQuestion1",
                        "question": "What does this map show me?",
                        "answer": "This map displays river networks with daily water temperature represented by colors shaded " + 
                                "from dark blue to dark red. These temperatures are generated from models that consider daily " +  
                                "fluctuations in environmental variables to calculate average stream temperature conditions for a " + 
                                "given day. This map also contains USGS real-time temperature monitoring sites that are visible at finer " + 
                                "zoom levels. Clicking on the symbol will open a graph of the past 7 days of temperature monitoring data " + 
                                "along-side the modeled temperature estimates. "
                    },
                    {
                        "id": "tempQuestion2",
                        "question": "What does “Concept Map” mean, and why aren’t these data available here for decision making? ",
                        "answer": "The data presented within the IWAAs water availability series of maps demonstrate a new USGS capability for calculating near real-time estimates of water budget variables.  The process (or concept) behind the data acquisition, modeling, and delivery of water temperature or water storage data throughout the lower 48 states are orchestrated using an operational pipeline in the Cloud (See About tab for more information).  While the models used for these calculations are complex and verified (" +
                        "<a href='https://doi.org/10.5066/P9NM8K8W' " + 
                        "target='_blank' " + 
                        "@click='runGoogleAnalytics('QA page', 'click', 'clicked reference for Hay 2019, Sanders et. al, 2017')' " +
                        ">Hay 2019, Sanders et. al, 2017</a>), the operational pipeline delivery and display capability was the focus of this work.  For those reasons, data are displayed so that the range of values may be observed, but the actual predictions are not available for download, and we discourage policy or decision making from these data at the present time.  In the future operational models with decision-ready data downloading will be a functionality."
                    },
                    {
                        "id": "tempQuestion3",
                        "question": "What stream network is represented in this map?",
                        "answer": "The streams which have model estimates developed are represented with the National Geospatial Fabric (<a\n" +
                        "href=\"https://doi.org/10.5066/P971JAGF\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for Bock et al. 2020')\"\n" +                        
                        ">Bock et al., 2020</a>) which have a similar scale as the National Hydrography Dataset Plus version 1 (1:100,000 scale, US EPA and USGS 2006)."
                    },
                    {
                        "id": "tempQuestion4",
                        "question": "Why is the “latest available” water temperature map not for today?",
                        "answer": "The latest model run requires a summary of the weather (precipitation and temperature) for a complete day. A sequence of operations begin at midnight starting with collecting observed weather data and ending several hours later with estimates of natural water storage and an updated map. For this reason, depending on the time of day relative to the latest update, the “date of latest available data” at the top of the map will be yesterday or the day before yesterday. Occasionally, the date at the top of the page is more than two days ago.  This is an indication that some part of the update operations did not run successfully and the team is working to bring the system back online. "
                    },
                    {
                        "id": "tempQuestion5",
                        "question": "How can I see the previous day’s water temperature?",
                        "answer": "Currently, users can not view maps for previous days. As a “Concept Map”, data are displayed so that the range of values may be observed, but the actual predictions are not available for download, and we discourage policy or decision making from these data at the present time.  In the future as the models are updated and further verified, viewing the previous day’s data and downloading will be a capability. "
                    },
                    {
                        "id": "tempQuestion6",
                        "question": "I live in Puerto Rico, why don't I see any water temperature data there?",
                        "answer": "The model used currently only has the input data it needs in order to calculate stream temperatures for the lower forty-eight states. In the future, the goal is to expand the model to include Hawaii, Alaska and Puerto Rico."
                    },
                    {
                        "id": "tempQuestion7",
                        "question": "Are brook trout streams represented in this map?",
                        "answer": "The streams which have model estimates developed are represented with the National Geospatial Fabric (<a\n"+
                        "href=\"https://doi.org/10.5066/P971JAGF\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for Bock et al. 2020')\"\n" + 
                        ">Bock et al., 2020</a>) which have a similar scope as the National Hydrography Dataset Plus version 1 (1:100,000 scale, <a\n"+
                        "href=\"https://www.epa.gov/sites/production/files/2016-02/documents/guidelines-water-quality-criteria.pdf\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for US EPA and USGS 2006')\"\n" +
                        ">US EPA and USGS 2006</a>). This medium scale river network will most likely not contain typical trout streams that are small, headwater, first-order mountain streams."
                    },
                    {
                        "id": "tempQuestion8",
                        "question": "Will there be improvements to this map in the future?",
                        "answer": "Yes. This water temperature map is part of a USGS product that displays multiple aspects of water availability for all hydrologic units across the lower forty-eight states. This application displays a near real-time indicator of stream water temperature for approximately 58,000 stream segments which may be increased over time with new models and new geospatial dataset availability. Water Temperature may be combined with other water availability factors in one map, or additional capabilities to query data, view historic model temperature estimates, or export data may be included in future releases. If you’re interested in contributing ideas or learning more, please reach out to <a\n"+
                        "href=\"mailto:gs-w_onhm@usgs.gov?subject=IWAAs Ideas or Contribution\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked gs-w_onhm@usgs.gov email link')\"\n" +
                        ">gs-w_onhm@usgs.gov</a>."
                    }
                ]
            },
            {
                "sectionTitle": "Deep in the Science for Water Temperature",
                "questionsAndAnswers": [
                    {
                        "id": "tempDeepScience1",
                        "question": "How are the water temperature estimates generated? ",
                        "answer": "The process behind the data acquisition, modeling, and delivery of water temperature data for streams throughout the lower 48 states are orchestrated using an operational pipeline in the Cloud (See About tab for more information). Water temperatures are estimated using the Precipitation-Runoff Modeling System (PRMS; <a\n"+
                        "href=\"https://doi.org/10.3133/tm6B7\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text reference for Markstrom et al 2015')\"\n" +
                        ">Markstrom and others, 2015</a>; <a\n"+
                        "href=\"https://pubs.usgs.gov/wri/1983/4238/report.pdf\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text reference for Leavesley and others 1983')\"\n" +
                        ">Leavesley and others, 1983</a>), and the SNTemp stream temperature model as part of the PRMS (<a\n"+
                        "href=\"https://doi.org/10.3133/tm6D4\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text reference for Sanders and others 2017')\"\n" +
                        ">Sanders and others, 2017</a>; <a\n"+
                        "href=\"https://pubs.er.usgs.gov/publication/ofr99112\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text reference for Bartholow 2000')\"\n" +
                        ">Bartholow, 2000</a>). Climate input data (<a " +
                        "href='https://doi.org/10.1002/joc.3413' " + 
                        "target='_blank' " +  
                        "@click='runGoogleAnalytics('about page', 'click', 'clicked text reference for Abatzoglou, 2013')'" +
                        ">Abatzoglou, 2013</a>) represent provisional estimates for the previous day.  "
                    },
                    {
                        "id": "tempDeepScience2",
                        "question": "Why was water temperature used as an indicator of water quality?",
                        "answer": "Stream temperature is one factor of overall water quality due to its impact on chemical cycling in rivers, aquatic organisms and their habitat. (<a " + 
                        "href='https://www.usgs.gov/special-topic/water-science-school/science/temperature-and-water?qt-science_center_objects=0#qt-science_center_objects' " + 
                        "target='_blank' " + 
                        "@click='runGoogleAnalytics('about page', 'click', 'clicked USGS science school overview on water temperature')'" + 
                        ">USGS science school overview on water temperature</a>) Streams naturally have different temperatures depending on how big they are, where they are located, and the time of year. "
                    },
                    {
                        "id": "tempDeepScience3",
                        "question": "How does water temperature impact aquatic biology? ",
                        "answer": "Stream temperature provides cues to aquatic organisms for every stage of their lifecycles.  Temperatures that are artificially kept cool (such as below dams) may inadvertently delay spawning in some organisms.  Elevated temperatures above certain thresholds may adversely affect aquatic organisms in chronic or acute ways through increases metabolic stress.  The US EPA and states have processes in place to select and maintain temperature standards for streams across the country (<a\n"+
                        "href=\"https://www.epa.gov/sites/production/files/2016-02/documents/guidelines-water-quality-criteria.pdf\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text reference for EPA 2016')\"\n" +
                        ">EPA, 2016</a>) to maintain beneficial uses."
                    },
                    {
                        "id": "tempDeepScience4",
                        "question": "How does water temperature impact the availability of water for beneficial uses?",
                        "answer": "Beneficial uses could be water supply for public supply, agricultural, or industrial water use; recreation such as fishing and swimming; and aquatic life and habitats.  Stream water temperature is related to chemical and biological processes which occur in streams.  With increased temperatures, algae production may increase, potentially creating difficulty for drinking water treatment plants to disinfect supplies.  Warmer than typical water temperatures may affect fish and other aquatic organisms which may impact fishing success.  Industries that require cooling water for processes depend on natural cooling benefits that streams and lakes can provide.    "
                    },
                    {
                        "id": "tempDeepScience5",
                        "question": "Do water temperature data reflect impacts of in-stream lakes and dams?",
                        "answer": "No, the current model application does not represent in-stream lakes or reservoirs, it only represents natural water temperature."
                    }
                ]
            }
        ]
    }
}
