import Vue from 'vue'
import VueRouter from 'vue-router'
import earthquakeMap from './components/earthquakeMap'
import censusMap from './components/censusMap'
import store from './store/store'
Vue.use(VueRouter)
const fetchLogoData = async () => ({
    mapData: await store.dispatch('mapData/fetchGoogleLogo')
})
const fetchEarthquakeData = async () => ({
    mapData: await store.dispatch('mapData/fetchEarthQuakeData')
})
const routes = [
    {
        path: '/earthquake', 
        component: earthquakeMap,
        props: fetchEarthquakeData

    },
    {
        path: '/census', 
        component: censusMap,
        props: fetchLogoData
    }
]

const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    to.matched.forEach((match) => {
        Object.keys(match.props).forEach(propKey => {
            let props = match.props[propKey];
            if (typeof props === "boolean") {
                next();
            } else {
                if (!match._cache_props) {
                    match._cache_props = props;
                }

                match._cache_props(to).then((data) => {
                    match.props[propKey] = () => data;
                    next();
                });
            }
        });

    });
});
export default router