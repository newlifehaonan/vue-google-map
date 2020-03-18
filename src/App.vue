<template>
  <div id="app">
    <simpleMap/>
    <HelloWorld/>
  </div>
</template>

<script>
import store from './store/store'
import HelloWorld from './components/HelloWorld'
import simpleMap from './components/simpleMap'
export default {
  name: 'App',
  store,
  components: {
    HelloWorld,
    simpleMap
  }
}
</script>
<style lang="scss">
@import "styles/global.scss";
</style>
