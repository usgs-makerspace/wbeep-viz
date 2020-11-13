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
                        "answer": "The " + process.env.VUE_APP_TITLE + " shows the latest available daily estimate of natural water storage for approximately 110,000 regions across the lower forty-eight states. Map shading indicates the current natural water storage relative to historical conditions for this time of year."
                    },
                    {
                        "id": "storageQuestion2",
                       "question": "What is the meaning of \"natural water storage\"?",
                       "answer": "Natural water storage shown here includes water present on the landscape such as standing water and water on trees, snowpack, soil water, and shallow groundwater. It does not include water in rivers or deep groundwater."
                    },
                    {
                        "id": "storageQuestion3",
                        "question": "Why is the \"latest available\" map not for today?",
                        "answer": "The latest model run requires a summary of the weather (precipitation and temperature) for a complete day. A sequence of operations begin at midnight starting with collecting observed weather data and ending several hours later with estimates of natural water storage and an updated map. For this reason, depending on the time of day relative to the latest update, the date at the top of the map will be yesterday or the day before yesterday. If the date is more than two days ago, that is an indication that some part of the update operations did not run successfully and the team is working to bring the system back online."
                    },
                    {
                        "id": "storageQuestion4",
                        "question": "What is being highlighted when I move my mouse on the map?",
                        "answer": "Highlighted modeling units or regions are called Hydrologic Response Units (HRUs). Each watershed is broken up into these regions in order to estimate the daily natural water storage. The units are based on the area that flows to the left or right side of a river between an upstream and downstream location."
                    },
                    {
                        "id": "storageQuestion5",
                        "question": "How can I see a previous day’s natural water storage value for my region?",
                        "answer": "There is not currently a way for users to view maps for previous days. In the future, this may be a capability."
                    },
                    {
                        "id": "storageQuestion6",
                        "question": "I live in Hawaii, why do I not see any natural water storage data there?",
                        "answer": "The model used currently only has the data it needs in order to calculate daily natural water storage for the lower forty-eight states. In the future, the goal is to expand the model to include Hawaii, Alaska and Puerto Rico."
                    },
                    {
                        "id": "storageQuestion7",
                        "question": "How can I print or save this map?",
                        "answer": "No specific features are built into this web site to print or save images at this time, but you can use those available in your web browser to save the image locally (In the Menu, look for Save As, which may give you options to save the HTML or PDF). Alternatively, you can use your computer’s screen capture capabilities to grab a screenshot of the map image and paste it into a local image editor to save it (for example, paste it into Microsoft Paint on a Windows computer)."
                    },
                    {
                        "id": "storageQuestion8",
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
                        "answer": "For the first phase of operationalizing a national hydrologic model to indicate water availability across the lower forty-eight states, the model focused only on natural flows (without human modification from reservoirs and withdrawals). As the model matures, additional hydrologic parameters will be produced by the operational model and additional indicators of water availability will be included on this map."
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
                                "      The <a\n" +
                                "        href=\"https://www.usgs.gov/mission-areas/water-resources/science/integrated-water-availability-assessments-iwaas\"\n" +
                                "        target=\"_blank\"\n" +
                                "        @click=\"runGoogleAnalytics('about page', 'click', 'clicked text link for IWAAs')\"\n" +
                                "      >USGS Integrated Water Availability Assessments (IWAAs)</a>\n" +
                                "      are a multi-extent, stakeholder driven, near real-time census and seasonal\n" +
                                "      prediction of water availability for both human and ecological uses at\n" +
                                "      regional and national extents.\n" +
                                "    </p>\n" +
                                "\n" +
                                "    <p>\n" +
                                "      The USGS IWAAs combine resources and knowledge gained from previous and\n" +
                                "      ongoing USGS efforts such as <a\n" +
                                "        href=\"https://water.usgs.gov/watercensus/focusarea.html\"\n" +
                                "        target=\"_blank\"\n" +
                                "        @click=\"runGoogleAnalytics('about page', 'click', 'clicked text link for Focus Area Studies')\"\n" +
                                "      >Focus Area Studies</a>,\n" +
                                "      <a\n" +
                                "        href=\"https://water.usgs.gov/watercensus/groundwater.html\"\n" +
                                "        target=\"_blank\"\n" +
                                "        @click=\"runGoogleAnalytics('about page', 'click', 'clicked text link for Regional Groundwater Availability Studies')\"\n" +
                                "      >Regional Groundwater Availability Studies</a>,\n" +
                                "      <a\n" +
                                "        href=\"https://water.usgs.gov/watercensus/water-use.html\"\n" +
                                "        target=\"_blank\"\n" +
                                "        @click=\"runGoogleAnalytics('about page', 'click', 'clicked text link for Water Use Estimation')\"\n" +
                                "      >Water Use estimation</a>,\n" +
                                "      <a\n" +
                                "        href=\"https://water.usgs.gov/watercensus/ecowater.html\"\n" +
                                "        target=\"_blank\"\n" +
                                "        @click=\"runGoogleAnalytics('about page', 'click', 'clicked text link for Ecological Water Needs')\"\n" +
                                "      >Ecological Water Needs</a>,\n" +
                                "      and <a\n" +
                                "        href=\"https://water.usgs.gov/watercensus/streamflow.html\"\n" +
                                "        target=\"_blank\"\n" +
                                "        @click=\"runGoogleAnalytics('about page', 'click', 'clicked text link for Streamflow estimation')\"\n" +
                                "      >Streamflow estimation</a>,\n" +
                                "      in addition to utilizing and providing feedback to the\n" +
                                "      <a\n" +
                                "        href=\"http://water.noaa.gov/about/nwm\"\n" +
                                "        target=\"_blank\"\n" +
                                "        @click=\"runGoogleAnalytics('about page', 'click', 'clicked text link for National Water Model')\"\n" +
                                "      >National Water Model</a>. The IWAAs\n" +
                                "      are designed to provide information to meet the goals of the\n" +
                                "      <a\n" +
                                "        href=\"https://water.usgs.gov/watercensus/index.html\"\n" +
                                "        target=\"_blank\"\n" +
                                "        @click=\"runGoogleAnalytics('about page', 'click', 'clicked text link for National Water Census')\"\n" +
                                "      >National Water Census</a> as established through the SECURE Water Act.\n" +
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
                        "answer": "The maps show seasonal-average daily average water withdrawals during 2015 divided into 3 month periods for thermoelectric, irrigation, and public supply categories of use within each watershed (<a\n" +
                        "href=\"https://www.usgs.gov/core-science-systems/ngp/national-hydrography/access-national-hydrography-products\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for HUC/National Watershed Boundary Dataset 2014')\"\n" +
                        ">10-digit hydrologic unit code, USGS 2014</a>) in the continental United States."
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
                        "question": "Where does the National Water Use map get the data it is presenting?",
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
                        "answer": "This map displays river networks with daily water temperature represented by colors shaded from light blue to dark red. These temperatures are generated from models that consider daily fluctuations in environmental variables to calculate average of stream temperature conditions for a given day."
                    },
                    {
                        "id": "tempQuestion2",
                        "question": "What stream network is represented in this map?",
                        "answer": "The streams which have model estimates developed are represented with the National Geospatial Fabric (<a\n" +
                        "href=\"https://doi.org/10.5066/P971JAGF\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for Bock et al. 2020')\"\n" +
                        ">Bock et al., 2020</a>) which have a similar scope as the National Hydrography Dataset Plus version 1 (1:100,000 scale)."
                    },
                    {
                        "id": "tempQuestion3",
                        "question": "Why is the “latest available” stream temperature map not for today?",
                        "answer": "The latest model run requires a summary of the weather (precipitation and temperature) for a complete day. A sequence of operations begin at midnight starting with collecting observed weather data and ending several hours later with estimates of natural water storage and an updated map. For this reason, depending on the time of day relative to the latest update, the date at the top of the map will be yesterday or the day before yesterday. If the date is more than two days ago, that is an indication that some part of the update operations did not run successfully and the team is working to bring the system back online."
                    },
                    {
                        "id": "tempQuestion4",
                        "question": "How can I see the previous day’s stream temperature?",
                        "answer": "There is not currently a way for users to view maps for previous days. In the future, this may be a capability."
                    },
                    {
                        "id": "tempQuestion5",
                        "question": "I live in Puerto Rico, why don't I see any stream temperature data there?",
                        "answer": "The model used currently only has the data it needs in order to calculate stream temperatures for the lower forty-eight states. In the future, the goal is to expand the model to include Hawaii, Alaska and Puerto Rico."
                    },
                    {
                        "id": "tempQuestion6",
                        "question": "Are brook trout streams represented in this map?",
                        "answer": "The streams which have model estimates developed are represented with the National Geospatial Fabric (<a\n" +
                        "href=\"https://doi.org/10.5066/P971JAGF\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked reference for Bock et al. 2020')\"\n" +
                        ">Bock et al., 2020</a>) which have a similar scope as the National Hydrography Dataset Plus version 1 (1:100,000 scale).  This medium scale river network will most likely not contain typical trout streams that are small, headwater, mountain streams due to the nature of the size of streams represented."
                    },
                    {
                        "id": "tempQuestion7",
                        "question": "Will there be improvements to this map in the future?",
                        "answer": "Yes. This water temperature map is part of a USGS product that displays multiple aspects of water availability for all hydrologic units across the lower forty-eight states. This application displays a near real-time indicator of stream temperature for approximately 85,000 stream segments. In the future this map will be updated or used to develop new products for enhanced data delivery and visualization. If you’re interested in contributing ideas or learning more, please reach out to <a\n"+
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
                        "question": "How are the stream temperature estimates generated? ",
                        "answer": "Stream temperatures are estimated using the Precipitation-Runoff Modeling System (PRMS; <a\n"+
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
                        ">Bartholow, 2000</a>)."
                    },
                    {
                        "id": "tempDeepScience2",
                        "question": "Why was stream temperature used as an indicator of water quality?",
                        "answer": "Stream temperature is one factor of overall water quality due to its impact on chemical cycling in rivers, aquatic organisms and their habitat.  Streams naturally have different temperatures depending on how big they are, where they are located, and the time of year. "
                    },
                    {
                        "id": "tempDeepScience3",
                        "question": "How does stream temperature impact aquatic biology? ",
                        "answer": "Stream temperature provides cues to aquatic organisms for every stage of their lifecycles.  Temperatures that are artificially kept cool (such as below dams) may inadvertently delay spawning in some organisms.  Elevated temperatures above certain thresholds may adversely affect aquatic organisms in chronic or acute ways through increases metabolic stress.  The US EPA and states have processes in place to select and maintain temperature standards for streams across the country (<a\n"+
                        "href=\"https://www.epa.gov/sites/production/files/2016-02/documents/guidelines-water-quality-criteria.pdf\"\n" +
                        "target=\"_blank\"\n" +
                        "@click=\"runGoogleAnalytics('about page', 'click', 'clicked text reference for EPA 2016')\"\n" +
                        ">EPA, 2016</a>) to maintain beneficial uses."
                    },
                    {
                        "id": "tempDeepScience4",
                        "question": "How does stream temperature impact the availability of water for beneficial uses?",
                        "answer": "Beneficial uses could be water supply for public supply, agricultural, or industrial water use; recreation such as fishing and swimming; and aquatic life and habitats.  Stream temperature is related to chemical and biological processes which occur in streams.  With increased temperatures, algae production may increase, potentially creating difficulty for drinking water treatment plants to disinfect supplies.  Warmer than typical water temperatures may affect fish and other aquatic organisms which may impact fishing success.  Industries that require cooling water for processes depend on natural cooling benefits that streams and lakes can provide.    "
                    },
                    {
                        "id": "tempDeepScience5",
                        "question": "Do stream temperature data reflect impacts of in-stream lakes and dams?",
                        "answer": "No, the current model application does not represent in-stream lakes or reservoirs, it only represents natural water temperature."
                    }
                ]
            }
        ]
    }
}
