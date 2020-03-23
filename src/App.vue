<template>
  <div id="app">
    <router-link to="/earthquake">To earthquake Map</router-link>
    <router-link to="/census">To Census Map</router-link>
    <router-view/>
  </div>
</template>

<script>
import store from './store/store'
import router from './routes'
export default {
  name: 'App',
  store,
  router
}
</script>
<style lang="scss">
@import "styles/global.scss";
</style>
