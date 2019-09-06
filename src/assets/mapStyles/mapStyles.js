export default {
    style: {
        version: 8,
        sources: {
            basemap: {
                type: 'vector',
                // The following line is used as a reference point for automated builds
                // to insert the correct base tile location - do not modify:
                // BASE SOURCE INSERT

                // If you are setting up a local build, you can uncomment the following
                // URL assignment to pull the base tiles from S3 so that no local tile
                // server is required:
                'tiles': ['http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/basetiles/{z}/{x}/{y}.pbf']
                //
                // The following URL is an example of using a local mbtiles file and a
                // tile server.  See the readme for more information:
                // https://github.com/usgs-makerspace/wbeep-viz#start-run-the-tile-server
                // url: 'http://localhost:8086/data/basemap.json'

            },
            HRU: {
                type: 'vector',
                // The following line is used as a reference point for automated builds
                // to insert the correct HRU tile location - do not modify:
                // HRU SOURCE INSERT

                // If you are setting up a local build, you can uncomment the following
                // URL assignment to pull the HRU tiles from S3 so that no local tile
                // server is required:
                'tiles': ['http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/tiles/{z}/{x}/{y}.pbf']
                //
                // The following URL is an example of using a local mbtiles file and a
                // tile server.  See the readme for more information:
                // https://github.com/usgs-makerspace/wbeep-viz#start-run-the-tile-server
                // url: 'http://localhost:8085/data/new2.json'
            },
            openmaptiles: {
                type: 'vector',
                'tiles': ['http://wbeep-test-website.s3-website-us-west-2.amazonaws.com/openmaptiles/{z}/{x}/{y}.pbf']
            },
            mapbox_terrain: {
                "type": "raster-dem",
                "url": "mapbox://mapbox.terrain-rgb",
                "tileSize": 256
            }
        },
        'sprite': '',
        'glyphs': 'https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf',
        'layers': [
            {
                "id": "background",
                "paint": {
                    "background-color": "hsl(47, 26%, 88%)"
                },
                "type": "background",
                'showButton': true
            },
            {
                "type": "hillshade",
                "paint": {
                    "hillshade-shadow-color": "hsl(39, 21%, 33%)"
                },
                "layout": {
                    "visibility": "visible"
                },
                "id": "MB Hill Shade",
                "source": "mapbox_terrain",
                'showButton': true
            },
            {
                'id': '*Counties Borders',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'counties',
                'minzoom': 6,
                'maxzoom': 24,
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'line-color': 'rgba(218, 234, 240, 1)'
                },
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Polygon"],
                    ["in", "class", "residential", "suburb", "neighbourhood"]
                ],
                "id": "landuse-residential",
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "fill-color": "hsl(47, 13%, 86%)",
                    "fill-opacity": 0.7
                },
                "source": "openmaptiles",
                "source-layer": "landuse",
                "type": "fill",
                'showButton': true
            },
            {
                "filter": ["==", "class", "grass"],
                "id": "landcover_grass",
                "paint": {
                    "fill-color": "hsl(82, 46%, 72%)",
                    "fill-opacity": 0.45
                },
                "source": "openmaptiles",
                "source-layer": "landcover",
                "type": "fill",
                'showButton': true
            },
            {
                "filter": ["==", "class", "wood"],
                "id": "landcover_wood",
                "paint": {
                    "fill-color": "hsl(82, 46%, 72%)",
                    "fill-opacity": {
                        "base": 1,
                        "stops": [
                            [8, 0.6],
                            [22, 1]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "landcover",
                "type": "fill",
                'showButton': true
            },

            {
                "filter": ["==", "subclass", "ice_shelf"],
                "id": "landcover-ice-shelf",
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "fill-color": "hsl(47, 26%, 88%)",
                    "fill-opacity": 0.8
                },
                "source": "openmaptiles",
                "source-layer": "landcover",
                "type": "fill",
                'showButton': true
            },
            {
                "filter": ["==", "subclass", "glacier"],
                "id": "landcover-glacier",
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "fill-color": "hsl(47, 22%, 94%)",
                    "fill-opacity": {
                        "base": 1,
                        "stops": [
                            [0, 1],
                            [8, 0.5]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "landcover",
                "type": "fill",
                'showButton': true
            },
            {
                "filter": ["all", ["in", "class", "sand"]],
                "id": "landcover_sand",
                "metadata": {},
                "paint": {
                    "fill-antialias": false,
                    "fill-color": "rgba(232, 214, 38, 1)",
                    "fill-opacity": 0.3
                },
                "source": "openmaptiles",
                "source-layer": "landcover",
                "type": "fill",
                'showButton': true
            },
            {
                "filter": ["==", "class", "agriculture"],
                "id": "landuse",
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "fill-color": "#eae0d0"
                },
                "source": "openmaptiles",
                "source-layer": "landuse",
                "type": "fill",
                'showButton': true
            },
            {
                "filter": ["==", "class", "national_park"],
                "id": "landuse_overlay_national_park",
                "paint": {
                    "fill-color": "#E1EBB0",
                    "fill-opacity": {
                        "base": 1,
                        "stops": [
                            [5, 0],
                            [9, 0.75]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "landcover",
                "type": "fill",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "brunnel", "tunnel"]
                ],
                "id": "waterway-tunnel",
                "paint": {
                    "line-color": "hsl(205, 56%, 73%)",
                    "line-dasharray": [3, 3],
                    "line-gap-width": {
                        "stops": [
                            [12, 0],
                            [20, 6]
                        ]
                    },
                    "line-opacity": 1,
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [8, 1],
                            [20, 2]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "waterway",
                "type": "line",
                "layout": {
                    "visibility": "visible"
                },
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["!in", "brunnel", "tunnel", "bridge"],
                    ["!=", "intermittent", 1]
                ],
                "id": "waterway",
                "paint": {
                    "line-color": "hsl(205, 56%, 73%)",
                    "line-opacity": 1,
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [8, 1],
                            [20, 8]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "waterway",
                "type": "line",
                "layout": {
                    "visibility": "visible"
                },
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["!in", "brunnel", "tunnel", "bridge"],
                    ["==", "intermittent", 1]
                ],
                "id": "waterway_intermittent",
                "paint": {
                    "line-color": "hsl(205, 56%, 73%)",
                    "line-opacity": 1,
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [8, 1],
                            [20, 8]
                        ]
                    },
                    "line-dasharray": [2, 1]
                },
                "source": "openmaptiles",
                "source-layer": "waterway",
                "type": "line",
                "layout": {
                    "visibility": "visible"
                },
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "brunnel", "tunnel"],
                    ["==", "class", "transit"]
                ],
                "id": "tunnel_railway_transit",
                "layout": {
                    "line-cap": "butt",
                    "line-join": "miter"
                },
                "minzoom": 0,
                "paint": {
                    "line-color": "hsl(34, 12%, 66%)",
                    "line-dasharray": [3, 3],
                    "line-opacity": {
                        "base": 1,
                        "stops": [
                            [11, 0],
                            [16, 1]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "id": "building",
                "paint": {
                    "fill-antialias": true,
                    "fill-color": "rgba(222, 211, 190, 1)",
                    "fill-opacity": {
                        "base": 1,
                        "stops": [
                            [13, 0],
                            [15, 1]
                        ]
                    },
                    "fill-outline-color": {
                        "stops": [
                            [15, "rgba(212, 177, 146, 0)"],
                            [16, "rgba(212, 177, 146, 0.5)"]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "building",
                "type": "fill",
                'showButton': true
            },
            {
                "filter": ["==", "$type", "Point"],
                "id": "housenumber",
                "layout": {
                    "text-field": "{housenumber}",
                    "text-font": ["Noto Sans Regular"],
                    "text-size": 10
                },
                "minzoom": 17,
                "paint": {
                    "text-color": "rgba(212, 177, 146, 1)"
                },
                "source": "openmaptiles",
                "source-layer": "housenumber",
                "type": "symbol",
                'showButton': true
            },
            {
                "id": "road_area_pier",
                "type": "fill",
                "metadata": {},
                "source": "openmaptiles",
                "source-layer": "transportation",
                "filter": ["all", ["==", "$type", "Polygon"],
                    ["==", "class", "pier"]
                ],
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "fill-color": "hsl(47, 26%, 88%)",
                    "fill-antialias": true
                },
                'showButton': true
            },
            {
                "id": "road_pier",
                "type": "line",
                "metadata": {},
                "source": "openmaptiles",
                "source-layer": "transportation",
                "filter": ["all", ["==", "$type", "LineString"],
                    ["in", "class", "pier"]
                ],
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "hsl(47, 26%, 88%)",
                    "line-width": {
                        "base": 1.2,
                        "stops": [
                            [15, 1],
                            [17, 4]
                        ]
                    }
                },
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Polygon"],
                    ["in", "brunnel", "bridge"]
                ],
                "id": "road_bridge_area",
                "layout": {},
                "paint": {
                    "fill-color": "hsl(47, 26%, 88%)",
                    "fill-opacity": 0.5
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "fill",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["in", "class", "path", "track"]
                ],
                "id": "road_path",
                "layout": {
                    "line-cap": "square",
                    "line-join": "bevel"
                },
                "paint": {
                    "line-color": "hsl(0, 0%, 97%)",
                    "line-dasharray": [1, 1],
                    "line-width": {
                        "base": 1.55,
                        "stops": [
                            [4, 0.25],
                            [20, 10]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["in", "class", "minor", "service"]
                ],
                "id": "road_minor",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "hsl(0, 0%, 97%)",
                    "line-width": {
                        "base": 1.55,
                        "stops": [
                            [4, 0.25],
                            [20, 30]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                "minzoom": 13,
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "brunnel", "tunnel"],
                    ["==", "class", "minor_road"]
                ],
                "id": "tunnel_minor",
                "layout": {
                    "line-cap": "butt",
                    "line-join": "miter"
                },
                "paint": {
                    "line-color": "#efefef",
                    "line-dasharray": [0.36, 0.18],
                    "line-width": {
                        "base": 1.55,
                        "stops": [
                            [4, 0.25],
                            [20, 30]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "brunnel", "tunnel"],
                    ["in", "class", "primary", "secondary", "tertiary", "trunk"]
                ],
                "id": "tunnel_major",
                "layout": {
                    "line-cap": "butt",
                    "line-join": "miter"
                },
                "paint": {
                    "line-color": "#fff",
                    "line-dasharray": [0.28, 0.14],
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [6, 0.5],
                            [20, 30]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Polygon"],
                    ["in", "class", "runway", "taxiway"]
                ],
                "id": "aeroway-area",
                "layout": {
                    "visibility": "visible"
                },
                "metadata": {
                    "mapbox:group": "1444849345966.4436"
                },
                "minzoom": 4,
                "paint": {
                    "fill-color": "rgba(255, 255, 255, 1)",
                    "fill-opacity": {
                        "base": 1,
                        "stops": [
                            [13, 0],
                            [14, 1]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "aeroway",
                "type": "fill",
                'showButton': true
            },
            {
                "filter": ["all", ["in", "class", "taxiway"],
                    ["==", "$type", "LineString"]
                ],
                "id": "aeroway-taxiway",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round",
                    "visibility": "visible"
                },
                "metadata": {
                    "mapbox:group": "1444849345966.4436"
                },
                "minzoom": 12,
                "paint": {
                    "line-color": "rgba(255, 255, 255, 1)",
                    "line-opacity": 1,
                    "line-width": {
                        "base": 1.5,
                        "stops": [
                            [12, 1],
                            [17, 10]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "aeroway",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["in", "class", "runway"],
                    ["==", "$type", "LineString"]
                ],
                "id": "aeroway-runway",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round",
                    "visibility": "visible"
                },
                "metadata": {
                    "mapbox:group": "1444849345966.4436"
                },
                "minzoom": 4,
                "paint": {
                    "line-color": "rgba(255, 255, 255, 1)",
                    "line-opacity": 1,
                    "line-width": {
                        "base": 1.5,
                        "stops": [
                            [11, 4],
                            [17, 50]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "aeroway",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["in", "class", "trunk", "primary"]
                ],
                "id": "road_trunk_primary",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "#fff",
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [6, 0.5],
                            [20, 30]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["in", "class", "secondary", "tertiary"]
                ],
                "id": "road_secondary_tertiary",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "#fff",
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [6, 0.5],
                            [20, 20]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "class", "motorway"]
                ],
                "id": "road_major_motorway",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "hsl(0, 0%, 100%)",
                    "line-offset": 0,
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [8, 1],
                            [16, 10]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "class", "transit"],
                    ["!=", "brunnel", "tunnel"]
                ],
                "id": "railway-transit",
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "line-color": "hsl(34, 12%, 66%)",
                    "line-opacity": {
                        "base": 1,
                        "stops": [
                            [11, 0],
                            [16, 1]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["==", "class", "rail"],
                "id": "railway",
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "line-color": "hsl(34, 12%, 66%)",
                    "line-opacity": {
                        "base": 1,
                        "stops": [
                            [11, 0],
                            [16, 1]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "brunnel", "bridge"]
                ],
                "id": "waterway-bridge-case",
                "layout": {
                    "line-cap": "butt",
                    "line-join": "miter"
                },
                "paint": {
                    "line-color": "#bbbbbb",
                    "line-gap-width": {
                        "base": 1.55,
                        "stops": [
                            [4, 0.25],
                            [20, 30]
                        ]
                    },
                    "line-width": {
                        "base": 1.6,
                        "stops": [
                            [12, 0.5],
                            [20, 10]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "waterway",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "brunnel", "bridge"]
                ],
                "id": "waterway-bridge",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "hsl(205, 56%, 73%)",
                    "line-width": {
                        "base": 1.55,
                        "stops": [
                            [4, 0.25],
                            [20, 30]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "waterway",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "brunnel", "bridge"],
                    ["==", "class", "minor_road"]
                ],
                "id": "bridge_minor case",
                "layout": {
                    "line-cap": "butt",
                    "line-join": "miter"
                },
                "paint": {
                    "line-color": "#dedede",
                    "line-gap-width": {
                        "base": 1.55,
                        "stops": [
                            [4, 0.25],
                            [20, 30]
                        ]
                    },
                    "line-width": {
                        "base": 1.6,
                        "stops": [
                            [12, 0.5],
                            [20, 10]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "brunnel", "bridge"],
                    ["in", "class", "primary", "secondary", "tertiary", "trunk"]
                ],
                "id": "bridge_major case",
                "layout": {
                    "line-cap": "butt",
                    "line-join": "miter"
                },
                "paint": {
                    "line-color": "#dedede",
                    "line-gap-width": {
                        "base": 1.55,
                        "stops": [
                            [4, 0.25],
                            [20, 30]
                        ]
                    },
                    "line-width": {
                        "base": 1.6,
                        "stops": [
                            [12, 0.5],
                            [20, 10]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "brunnel", "bridge"],
                    ["==", "class", "minor_road"]
                ],
                "id": "bridge_minor",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "#efefef",
                    "line-width": {
                        "base": 1.55,
                        "stops": [
                            [4, 0.25],
                            [20, 30]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "LineString"],
                    ["==", "brunnel", "bridge"],
                    ["in", "class", "primary", "secondary", "tertiary", "trunk"]
                ],
                "id": "bridge_major",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "#fff",
                    "line-width": {
                        "base": 1.4,
                        "stops": [
                            [6, 0.5],
                            [20, 30]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "transportation",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["in", "admin_level", 4, 6, 8],
                "id": "admin_sub",
                "layout": {
                    "visibility": "visible"
                },
                "paint": {
                    "line-color": "hsla(0, 0%, 60%, 0.5)",
                    "line-dasharray": [2, 1]
                },
                "source": "openmaptiles",
                "source-layer": "boundary",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["<=", "admin_level", 2],
                    ["==", "$type", "LineString"]
                ],
                "id": "admin_country",
                "layout": {
                    "line-cap": "round",
                    "line-join": "round"
                },
                "paint": {
                    "line-color": "hsl(0, 0%, 60%)",
                    "line-width": {
                        "base": 1.3,
                        "stops": [
                            [3, 0.5],
                            [22, 15]
                        ]
                    }
                },
                "source": "openmaptiles",
                "source-layer": "boundary",
                "type": "line",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Point"],
                    ["==", "rank", 1]
                ],
                "id": "poi_label",
                "layout": {
                    "icon-size": 1,
                    "text-anchor": "top",
                    "text-field": "{name:latin}\n{name:nonlatin}",
                    "text-font": ["Noto Sans Regular"],
                    "text-max-width": 8,
                    "text-offset": [0, 0.5],
                    "text-size": 11,
                    "visibility": "visible"
                },
                "minzoom": 14,
                "paint": {
                    "text-color": "#666",
                    "text-halo-blur": 1,
                    "text-halo-color": "rgba(255,255,255,0.75)",
                    "text-halo-width": 1
                },
                "source": "openmaptiles",
                "source-layer": "poi",
                "type": "symbol",
                'showButton': true
            },
            {
                "filter": ["==", "$type", "LineString"],
                "id": "road_major_label",
                "layout": {
                    "symbol-placement": "line",
                    "text-field": "{name:latin} {name:nonlatin}",
                    "text-font": ["Noto Sans Regular"],
                    "text-letter-spacing": 0.1,
                    "text-rotation-alignment": "map",
                    "text-size": {
                        "base": 1.4,
                        "stops": [
                            [10, 8],
                            [20, 14]
                        ]
                    },
                    "text-transform": "uppercase"
                },
                "paint": {
                    "text-color": "#000",
                    "text-halo-color": "hsl(0, 0%, 100%)",
                    "text-halo-width": 2
                },
                "source": "openmaptiles",
                "source-layer": "transportation_name",
                "type": "symbol",
                'showButton': true
            },
            {
                'id': 'HRUs',
                'type': 'fill',
                'source': 'HRU',
                'source-layer': 'hrus',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': {
                        'property': 'value',
                        'type': 'categorical',
                        'stops': [
                            ["very high","#144873"],
                            ["high","#A7B9D7"],
                            ['medium','#FED98E'],
                            ['low', '#EDAA5F'],
                            ["very low","#CC4C02"],
                            ["",'#000000'],
                        ]
                    },
                    'fill-opacity': ['case',
                        ['boolean', ['feature-state', 'hover'], false],
                        0.1,
                            .4
                    ]
                },
                'showButton': true
            },
            {
                'id': '*Rivers',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'USA_Rivers_and_Streams',
                'minzoom': 5,
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'line-color': 'rgba(115, 255, 255, 1)'
                },
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Polygon"],
                    ["!=", "intermittent", 1]
                ],
                "id": "water",
                "paint": {
                    "fill-color": "hsl(205, 56%, 73%)"
                },
                "source": "openmaptiles",
                "source-layer": "water",
                "type": "fill",
                "layout": {
                    "visibility": "visible"
                },
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Polygon"],
                    ["==", "intermittent", 1]
                ],
                "id": "water_intermittent",
                "paint": {
                    "fill-color": "hsl(205, 56%, 73%)",
                    "fill-opacity": 0.7
                },
                "source": "openmaptiles",
                "source-layer": "water",
                "type": "fill",
                "layout": {
                    "visibility": "visible"
                },
                'showButton': true
            },
            {
                'id': '*Neighboring Countries',
                'type': 'fill',
                'source': 'basemap',
                'source-layer': 'neighboringcountry',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': 'rgba(237, 236, 232, 1)'
                },
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Point"],
                    ["==", "class", "city"]
                ],
                "id": "place_label_city",
                "layout": {
                    "text-field": "{name:latin}\n{name:nonlatin}",
                    "text-font": ["Noto Sans Regular"],
                    "text-max-width": 10,
                    "text-size": {
                        "stops": [
                            [3, 12],
                            [8, 16]
                        ]
                    }
                },
                "maxzoom": 16,
                "paint": {
                    "text-color": "hsl(0, 0%, 0%)",
                    "text-halo-blur": 0,
                    "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
                    "text-halo-width": 2
                },
                "source": "openmaptiles",
                "source-layer": "place",
                "type": "symbol",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Point"],
                    ["==", "class", "country"],
                    ["!has", "iso_a2"]
                ],
                "id": "country_label-other",
                "layout": {
                    "text-field": "{name:latin}",
                    "text-font": ["Noto Sans Regular"],
                    "text-max-width": 10,
                    "text-size": {
                        "stops": [
                            [3, 12],
                            [8, 22]
                        ]
                    },
                    "visibility": "visible"
                },
                "maxzoom": 12,
                "paint": {
                    "text-color": "hsl(0, 0%, 13%)",
                    "text-halo-blur": 0,
                    "text-halo-color": "rgba(255,255,255,0.75)",
                    "text-halo-width": 2
                },
                "source": "openmaptiles",
                "source-layer": "place",
                "type": "symbol",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Point"],
                    ["==", "class", "country"],
                    ["has", "iso_a2"]
                ],
                "id": "country_label",
                "layout": {
                    "text-field": "{name:latin}",
                    "text-font": ["Noto Sans Bold"],
                    "text-max-width": 10,
                    "text-size": {
                        "stops": [
                            [3, 12],
                            [8, 22]
                        ]
                    },
                    "visibility": "visible"
                },
                "maxzoom": 12,
                "paint": {
                    "text-color": "hsl(0, 0%, 13%)",
                    "text-halo-blur": 0,
                    "text-halo-color": "rgba(255,255,255,0.75)",
                    "text-halo-width": 2
                },
                "source": "openmaptiles",
                "source-layer": "place",
                "type": "symbol",
                'showButton': true
            },
            {
                "filter": ["all", ["==", "$type", "Point"],
                    ["!in", "class", "city", "state", "country", "continent"]
                ],
                "id": "place_label_other",
                "layout": {
                    "text-anchor": "center",
                    "text-field": "{name:latin}\n{name:nonlatin}",
                    "text-font": ["Noto Sans Regular"],
                    "text-max-width": 6,
                    "text-size": {
                        "stops": [
                            [6, 10],
                            [12, 14]
                        ]
                    },
                    "visibility": "visible"
                },
                "minzoom": 8,
                "paint": {
                    "text-color": "hsl(0, 0%, 25%)",
                    "text-halo-blur": 0,
                    "text-halo-color": "hsl(0, 0%, 100%)",
                    "text-halo-width": 2
                },
                "source": "openmaptiles",
                "source-layer": "place",
                "type": "symbol",
                'showButton': true
            }
        ]
    }
};