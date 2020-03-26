import Vue from 'vue'
import VueRouter from 'vue-router'
import earthquakeMap from './components/earthquakeMap'
import censusMap from './components/censusMap'
import store from './store/store'
Vue.use(VueRouter)
const routes = [
    {
        path: '/', 
        component: earthquakeMap
    },
    {
        path: '/earthquake', 
        component: earthquakeMap,
        beforeEnter: async (to, from,next) => {
            try {
                if(store.getters['mapData/getEarthQuakeData']) {
                    next()
                } else {
                    await store.dispatch('mapData/fetchEarthQuakeData')
                    next()
                }
            } catch(error) {
                console.error(error)
            }
        }
    },
    {
        path: '/census', 
        component: censusMap,
        beforeEnter: async (to, from,next) => {
            try {
                if(store.getters['mapData/getGoogleLogoData']) {
                    next()
                } else {
                    await store.dispatch('mapData/fetchGoogleLogo')
                    next()
                }
            } catch(error) {
                console.error(error)
            }
        }
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach(async (to, from, next) => {
    console.log('call global beforeEach')
    try {
        const loaded =  await store.dispatch('asyncLoad/loadMap')
        if (loaded) {
            next()
        }
    } catch(error) {
        console.error(error)
    }
})
export default router