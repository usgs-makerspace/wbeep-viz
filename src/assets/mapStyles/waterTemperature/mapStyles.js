// Since the Mapbox gl wants the tile request to have an array containing the URL for the tiles, we need to
// grab the URL for the correct tier from the environment variables and prepackage the result as an array
const streamsTileUrl = [];
streamsTileUrl.push(process.env.VUE_APP_STREAM_TEMP_TILE_URL);

export default {
    style: {
        version: 8,
        sources: {
            basemap: {
                type: 'vector',
                'tiles': ['https://maptiles-prod-website.s3-us-west-2.amazonaws.com/misctilesets/usstatecounties/{z}/{x}/{y}.pbf'],
                'minzoom': 2, // setting this to equal the minzoom of main map, real tile extent is 2
                'maxzoom': 8  // setting this to equal the maxzoom of main map, real tile extent is 10
            },
            openmaptiles: {
                type: 'vector',
                'tiles': ['https://maptiles-prod-website.s3-us-west-2.amazonaws.com/openmaptiles/baselayers/{z}/{x}/{y}.pbf'],
                'minzoom': 2,
                'maxzoom': 8
            },
            hillshade: {
                type: 'raster',
                'tiles': ['https://maptiles-prod-website.s3-us-west-2.amazonaws.com/openmaptiles/omthillshade/{z}/{x}/{y}.png'],
                'minzoom': 2,
                'maxzoom': 12,
                'tileSize': 256
            },
            streams: {
                type: 'vector',
                'tiles': streamsTileUrl,
                'minzoom': 2,
                'maxzoom': 8
            },
            greatlakes: {
                type: 'vector',
                'tiles': ['https://maptiles-prod-website.s3-us-west-2.amazonaws.com/greatlakes/{z}/{x}/{y}.pbf'],
                'minzoom': 2,
                'maxzoom': 8
            },
            watertemplocations: {
                type: 'geojson',
                data: 'https://maptiles-prod-website.s3-us-west-2.amazonaws.com/geojson/currentQW.json'
            }
        },
        'sprite': '',
        'glyphs': 'https://orangemug.github.io/font-glyphs/glyphs/{fontstack}/{range}.pbf',
        'layers': [
            {
                'id': 'background',
                'paint': {
                    'background-color': 'hsl(47, 26%, 88%)'
                },
                'type': 'background',
                'showButtonLayerToggle': false
            },
            {
                'filter': ['all', ['==', '$type', 'Polygon'],
                    ['!=', 'intermittent', 1]
                ],
                'id': 'water',
                'paint': {
                    'fill-color': 'hsl(205, 56%, 73%)'
                },
                'source': 'openmaptiles',
                'source-layer': 'water',
                'type': 'fill',
                'layout': {
                    'visibility': 'visible'
                },
                'showButtonLayerToggle': false
            },             
            {
                'id': 'states-fill',
                'type': 'fill',
                'source': 'basemap',
                'source-layer': 'states',
                'minzoom': 2,
                'maxzoom': 24,
                'layout': {
                    'visibility': 'visible',
                },
                'paint': {
                    'fill-color': 'hsl(47, 26%, 88%)'
                }
            },
            {
                'id': 'streams_interpolated',
                'layerDescription': 'all streams',
                'type': 'line',
                'source': 'streams',
                'source-layer': 'segsAllConus',
                'minzoom': 2,
                'maxzoom': 9,
                'layout': {
                    'visibility': 'visible'
                },
                'filter': ["all", ["has", "temp"]],
                'filter': ['==', ['typeof', ['get', 'temp']], 'number'],
                "paint": {
                    "line-width": [
                        "interpolate", 
                        ["linear"], ["zoom"],
                        5, 1,
                        6, 2
                    ],
                    "line-color": [
                        "interpolate", ["linear"], ["get", "temp"],
                        0, "#10305d", 
                        15, "#c4c1b6",
                        30, "#730000"
                    ]
                  }

            },
            {
                'id': 'Neighboring Countries',
                'type': 'fill',
                'source': 'basemap',
                'minzoom': 2,
                'maxzoom': 24,
                'source-layer': 'neighboringcountry',
                'layout': {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': 'hsl(47, 26%, 88%)'
                },
                'showButtonLayerToggle': false
            },
            {
                'id': 'Great Lakes',
                'type': 'fill',
                'source': 'greatlakes',
                'minzoom' : 0,
                'maxzoom': 9,
                'source-layer': 'Great_Lakes',
                'layout' : {
                    'visibility': 'visible'
                },
                'paint': {
                    'fill-color': 'hsl(205, 56%, 73%)'
                }
            },
            {
                'id': 'Terrain',
                'type': 'raster',
                'source': 'hillshade',
                'layout': {
                    'visibility': 'none'
                },
                'showButtonLayerToggle': true
            },
            {
                'id': 'Counties',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'counties',
                'minzoom': 4.5,
                'maxzoom': 24,
                'layout': {
                    'visibility': 'none'
                },
                'paint': {
                    'line-color': 'rgb(0,0,0)',
                    'line-dasharray': [2, 4]
                },
                'showButtonLayerToggle': true
            },
            {
                'id': 'states',
                'type': 'line',
                'source': 'basemap',
                'source-layer': 'states',
                'minzoom': 2,
                'maxzoom': 24,
                'layout': {
                    'visibility': 'visible',
                },
                'paint': {
                    'line-color': 'rgb(0,0,0)'
                }

            },
            {
                'filter': ['all', ['==', '$type', 'Point'],
                    ['==', 'class', 'city']
                ],
                'id': 'place_label_city',
                'layout': {
                    'text-field': '{name:latin}\n{name:nonlatin}',
                    'text-font': ['Noto Sans Regular'],
                    'text-max-width': 10,
                    'text-size': {
                        'stops': [
                            [3, 12],
                            [8, 16]
                        ]
                    }
                },
                'maxzoom': 16,
                'minzoom': 5,
                'paint': {
                    'text-color': 'hsl(0, 0%, 0%)',
                    'text-halo-blur': 0,
                    'text-halo-color': 'hsla(0, 0%, 100%, 0.75)',
                    'text-halo-width': 2
                },
                'source': 'openmaptiles',
                'source-layer': 'place',
                'type': 'symbol',
                'showButtonLayerToggle': false
            },
            {
            'id': 'USGS temperature monitoring stations',
            'type': 'circle',
            'source': 'watertemplocations',
            'showButtonLayerToggle': true,
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'circle-color':  '#000000',
                'circle-stroke-color': '#ffffff',
                'circle-stroke-width': 1,
                'circle-opacity': 1,
                'circle-radius': {
                    stops: [[4, 2], [6, 3], [7, 4], [8,4]]
                }
            },
            'minzoom': 4,
            'maxzoom': 23
        }
        ]
    }
};
