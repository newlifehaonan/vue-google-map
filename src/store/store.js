import Vuex from 'vuex'
import Vue from 'vue'
import algebra from './algebra'
import asyncLoad from './asyncLoad'
import map from './map'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        algebra: algebra,
        asyncLoad: asyncLoad,
        map: map
    }
})

export default store