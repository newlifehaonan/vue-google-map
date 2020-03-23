import Vuex from 'vuex'
import Vue from 'vue'
import asyncLoad from './asyncLoad'
import mapData from './mapData'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        asyncLoad: asyncLoad,
        mapData: mapData
    }
})

export default store