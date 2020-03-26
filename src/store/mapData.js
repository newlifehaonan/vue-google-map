import googleApi from '../apis/googleApi'
const mapData = {
    namespaced: true,
    state: {
        googleLogoData: null,
        earthQuakeData: null,
    },
    mutations: {
        setGoogleLogoData(state, payload) {
            state.googleLogoData = payload
        },
        setEarthQuakeData(state, payload) {
            state.earthQuakeData = payload
        }
    },
    getters: {
        getGoogleLogoData(state) {
            return state.googleLogoData
        },
        getEarthQuakeData(state) {
            return state.earthQuakeData
        }
    },
    actions: {
        async fetchGoogleLogo({commit}) {
            try {
                console.log('fetchGoogleLogo dispatched')
                const response = await googleApi.get('google.json')
                commit('setGoogleLogoData', response.data)
                return response.data
            } catch(error) {
                return error
            }
        },
        async fetchEarthQuakeData({commit}) {
            try {
                console.log('fetchEarthQuakeData dispatched')
                const response = await googleApi.get('quakes.geo.json')
                const callback = response.data
                window.eqfeed_callback = (result) => result
                const data = eval(callback)
                commit('setEarthQuakeData', data)
                return data
            } catch(error) {
                return error
            }
        }
    }
}
export default mapData
