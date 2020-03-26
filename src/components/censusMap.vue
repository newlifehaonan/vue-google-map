<template>
    <div>
        <p>Hello Census Map</p>
        <div class="map-body" ref="map-census"></div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            map: window.google.maps
        }
    }
}
</script>