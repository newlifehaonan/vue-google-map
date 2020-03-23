<template>
    <div class="map-container">
        <div class="map-body" ref="map"></div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import mapConfig from '../utils/mapConfig'
import MarkerClusterer from '@google/markerclusterer'
export default {
    name: 'simpleMap',
    props: {
        mapData: {
            type: Object,
            default: () => {}
        }
    },
    data() {
        return {
            mapConfig: null
        }
    },
    computed: {
        ...mapGetters('mapData', [
            'getOneCity',
        ])
    },
    methods: {
        ...mapActions('asyncLoad', [
            'loadMap'
        ]),
        ...mapActions('mapData', [
            'fetchEarthQuakeData'
        ]),
        initMarkerCluster(map, marker) {
            return new MarkerClusterer(map, marker,
            {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            }); 
        },
        getCircle(magnitude, path) {
            return {
            path,
            fillColor: 'red',
            fillOpacity: .2,
            scale: Math.pow(2, magnitude) / 2,
            strokeColor: 'white',
            strokeWeight: .5
            }
        },
        async loadGoogleObject() {
            try {
                const google = await this.loadMap()
                return google
            } catch(error) {
                return error
            }
        },
        async initMapObject(google) {
            try {
                const { maps } = google
                const map = new maps.Map(this.$refs['map'], this.mapConfig);
                return map
            } catch(error) {
                return error
            }
        },
        async loadEarthQuakeDataToMap(map, google) {
            try {
                const earthQuakeData = await this.fetchEarthQuakeData()
                map.data.addGeoJson(earthQuakeData)
                map.data.setStyle((feature) => {
                    const magnitude = feature.getProperty('mag');
                    return {
                        icon: this.getCircle(magnitude, google.maps.SymbolPath.CIRCLE)
                    };
                });
            } catch(error) {
                return error
            }
        },
        async loadDataToMap() {
            try {
                const google = await this.loadGoogleObject()
                const map = await this.initMapObject(google)
                this.loadEarthQuakeDataToMap(map, google)
            } catch(error) {
                console.log(error)
            }
        }
    },
    async created() {
        this.mapConfig = new mapConfig(this.getOneCity, 2)
        this.loadDataToMap()
    }
}
</script>