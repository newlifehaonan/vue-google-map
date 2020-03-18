import Vuex from 'vuex'
import Vue from 'vue'
import algebra from './algebra'
import asyncLoad from './asyncLoad'
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        algebra: algebra,
        asyncLoad: asyncLoad
    }
})

export default store