import axios from "Services/Http/Axios";

class NotteManager {

    /**
     * Get data list
     *
     * @returns {Promise<*>}
     */
    async list() {

        let url = '/api/notte';

        return axios.get(url).then(response => {

            return response;

        }).catch(error => {

            return error;

        });
    }
}

export default NotteManager;