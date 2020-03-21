import { CALLBACK_NAME, API_KEY } from '../utils/constant'
const asyncLoad = {
    namespaced: true,
    modules: {
        googleMap :{
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
                    if (getters.getMapState) return getters.getInitePromise
                    commit('setMapState')
                    window[CALLBACK_NAME] = () => getters.getResolvedPromise(window.google);
                    const script = document.createElement('script');
                    script.async = true;
                    script.defer = true;
                    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&callback=${CALLBACK_NAME}`;
                    script.onerror = getters.getRejectPromise;
                    document.querySelector('head').appendChild(script);
                    return getters.getInitePromise
                }
            }
        },
        earthquakeData: {
            namespaced: true,
            state: {
                initPromise: null,
                resolveInitPromise: null,
                rejectInitPromise: null
            },
            mutations: {
                setData(state, data) {
                    state.loadedData = data
                },
                setPromise(state) {
                    state.initPromise = new Promise((resolve, reject) => {
                        state.resolveInitPromise = resolve,
                        state.rejectInitPromise = reject
                    })
                }
            },
            getters: {
                getEathquakeData(state) {
                    return state.loadedData
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
                loadData({commit, getters}) {

                    commit('setPromise')
                    const script = document.createElement('script');
                    script.async = true;
                    script.defer = true;
                    script.src = 'https://developers.google.com/maps/documentation/javascript/examples/json/earthquake_GeoJSONP.js';
                    script.onerror = getters.getRejectPromise;
                    document.getElementsByTagName('head')[0].appendChild(script);
                    window.eqfeed_callback = (results) => getters.getResolvedPromise(results);
                    return getters.getInitePromise
                }
            }
        }
    }
}
export default asyncLoad