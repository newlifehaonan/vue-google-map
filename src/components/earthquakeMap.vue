<template>
    <div class="map-container">
        <p>Hello Earthquake Map</p>
        <div class="map-body" ref="map"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'simpleMap',
    data() {
        return {
            google: window.google,
            earthquakeMap: null,
        }
    },
    computed: {
        ...mapGetters('mapData', [
            'getEarthQuakeData'
        ])
    },
    methods: {
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
        loadEarthQuakeDataToMap() {
            this.earthquakeMap.data.addGeoJson(this.getEarthQuakeData)
            this.earthquakeMap.data.setStyle((feature) => {
                const magnitude = feature.getProperty('mag');
                return {
                    icon: this.getCircle(magnitude, this.google.maps.SymbolPath.CIRCLE)
                };
            });
        },
    },
    mounted() {
        const latlng = new this.google.maps.LatLng(-28.024, 140.887);
        const initSpot = {
            center: latlng,
            zoom: 2
        }
        this.earthquakeMap = new this.google.maps.Map(this.$refs['map'], initSpot);
        this.loadEarthQuakeDataToMap()
    }
}
</script>