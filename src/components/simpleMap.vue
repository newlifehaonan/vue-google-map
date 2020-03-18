<template>
    <div class="map-container">
        <h1>Hello Google Map</h1>
        <div class="map-body" ref="map"></div>
    </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import mapConfig from '../utils/mapConfig'
export default {
    name: 'simpleMap',
    data() {
        return {
            map: null,
            mapConfig: null
        }
    },
    computed: {
        ...mapGetters('asyncLoad', [
            'getMapState'
        ])
    },
    methods: {
        ...mapActions('asyncLoad', [
            'loadMap'
        ])
    },
    created() {
        this.mapConfig = new mapConfig({lat: -34.397, lng: 150.644}, 8)
        this.loadMap()
            .then(
                (google) => {
                    this.map = new google.maps.Map(this.$refs['map'], this.mapConfig);
                }
            )
    }
}
</script>