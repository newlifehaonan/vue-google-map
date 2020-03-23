import { ONE_CITY } from '../utils/constant'
import googleApi from '../apis/googleApi'
const mapData = {
    namespaced: true,
    state: {
        oneCity: ONE_CITY,
        googleLogoData: null,
    },
    mutations: {
        setGoogleLogoData(state, payload) {
            state.googleLogoData = payload
        }
    },
    getters: {
        getOneCity(state) {
            return state.oneCity
        },
        getGoogleLogoData(state) {
            return state.googleLogoData
        }
    },
    actions: {
        async fetchGoogleLogo({commit}) {
            try {
                console.log('i am dispatched')
                const response = await googleApi.get('google.json')
                commit('setGoogleLogoData', response.data)
                return response.data
            } catch(error) {
                return error
            }
        },
        async fetchEarthQuakeData() {
            try {
                console.log('i am dispatched')
                const response = await googleApi.get('quakes.geo.json')
                const callback = response.data
                window.eqfeed_callback = (result) => result
                return eval(callback)
            } catch(error) {
                return error
            }
        }
    }
}
export default mapData
