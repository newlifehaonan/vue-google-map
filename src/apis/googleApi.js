import axios from 'axios'
export default {
    async get(sourceFile) {
        try {
            const response = await axios.get(
                `https://storage.googleapis.com/mapsdevsite/json/${sourceFile}`
            )
            return response
        } catch (error) {
            return error
        }
    }
}