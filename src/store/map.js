import { ONE_CITY, LOCATIONS } from '../utils/constant'
import googleApi from '../apis/googleApi'
const map = {
    namespaced: true,
    state: {
        oneCity: ONE_CITY,
        mapClusterData: LOCATIONS
    },
    mutations: {
    },
    getters: {
        getOneCity(state) {
            return state.oneCity
        },
        getMapClusterData(state) {
            return state.mapClusterData
        }
    },
    actions: {
        async fetchGoogleLogo() {
            try {
                const response = await googleApi.get('google.json')
                return response.data
            } catch(error) {
                return error
            }
        }
    }
}
export default map