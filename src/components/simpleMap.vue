<template>
    <div class="map-container">
        <h1>Hello Google Map</h1>
        <div class="map-body" ref="map_1"></div>
        <div class="map-body" ref="map_2"></div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import mapConfig from '../utils/mapConfig'
import MarkerClusterer from '@google/markerclusterer'
export default {
    name: 'simpleMap',
    data() {
        return {
            map: null,
            mapConfig: null,
            mapMarker: null
        }
    },
    computed: {
        ...mapGetters('asyncLoad/googleMap', [
            'getMapState'
        ]),
        ...mapGetters('map', [
            'getOneCity',
            'getMapClusterData',
            'getGoogleLogo'
        ])
    },
    methods: {
        ...mapActions('asyncLoad/googleMap', [
            'loadMap'
        ]),
        ...mapActions('asyncLoad/earthquakeData', [
            'loadData'
        ]),
        ...mapActions('map', [
            'fetchGoogleLogo'
        ]),
        initMarkerCluster(map, marker) {
            return new MarkerClusterer(map, marker,
            {
                imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
            }); 
        },
        loadDataToMap() {
            try {

            } catch(error) {
                
            }
            Promise.all([this.loadMap(), this.loadData()])
                .then(
                    ([google, data]) => {
                        this.mapMarker = this.getMapClusterData.map((location) => {
                            return new google.maps.Marker({
                                position: location
                            })
                        })
                        this.map = new google.maps.Map(this.$refs['map_1'], this.mapConfig);
                        this.initMarkerCluster(this.map, this.mapMarker)
                        this.map.data.addGeoJson(data)
                        this.map.data.setStyle((feature) => {
                            const magnitude = feature.getProperty('mag');
                            return {
                                icon: this.getCircle(magnitude, google.maps.SymbolPath.CIRCLE)
                            };
                        });
                    }
                )
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
        async renderGoogleLogo() {
            try {
                const google = await this.loadMap()
                const data = await this.fetchGoogleLogo()
                const map = new google.maps.Map(this.$refs['map_2'], this.mapConfig);
                map.data.loadGeoJson(data);
            } catch(error) {
                console.log(error)
            }
        }
    },
    async created() {
        this.mapConfig = new mapConfig(this.getOneCity, 2)
        this.loadDataToMap()
        this.renderGoogleLogo()
    }
}
</script>