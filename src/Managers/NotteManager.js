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

    /**
     * Get notte
     *
     * @param id
     * @returns {Promise<void>}
     */
    async get(id) {
        let url = `/api/notte/${id}`

        return axios.get(url).then(response => {
            return response;
        }).catch(error => {
            return error;
        });
    }

    /**
     * Create new notte
     * @returns {Promise<void>}
     */
    async create() {

    }
}

export default NotteManager;
