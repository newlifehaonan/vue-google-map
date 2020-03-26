import { API_KEY } from '../environment/key'
const asyncLoad = {
    namespaced: true,
    state: {
        mapLoaded: !!window.google,
        initPromise: null,
        resolveInitPromise: null,
        rejectInitPromise: null
    },
    mutations: {
        setMapState(state) {
            state.mapLoaded = !state.mapLoaded
        },
        setPromise(state) {
            state.initPromise = new Promise((resolve, reject) => {
                state.resolveInitPromise = resolve,
                state.rejectInitPromise = reject
            })
        }
    },
    getters: {
        getMapState(state) {
            return state.mapLoaded
        },
        getInitePromise(state) {
            return state.initPromise
        },
        getResolvedPromise(state) {
            return state.resolveInitPromise
        },
        getRejectPromise(state) {
            return state.rejectInitPromise
        }
    },
    actions: {
        loadMap({commit, getters}) {
            commit('setPromise')
            if (getters.getMapState) return Promise.resolve('Success')
            commit('setMapState')
            window['gmapsCallback'] = () => getters.getResolvedPromise(window.google);
            const script = document.createElement('script');
            script.async = true;
            script.defer = true;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=gmapsCallback`;
            script.onerror = getters.getRejectPromise;
            document.querySelector('head').appendChild(script);
            return getters.getInitePromise
        }
    }
}
export default asyncLoad