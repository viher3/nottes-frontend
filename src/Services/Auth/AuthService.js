import axios from "Services/Http/Axios";
import AuthHelper from "Helpers/AuthHelper";
import NotificationService from "Services/Common/NotificationService";

class AuthService {

    /**
     * Check user credentials
     *
     * @param username
     * @param password
     * @returns {Promise<*>}
     */
    async checkLogin(username, password) {
        let params = {
            '_username': username,
            '_password': password
        };

        let loginUrl = '/api/login';

        return axios.post(loginUrl, params).then((response) => {

            if (response.status === 200) {
                let authToken = response.data.token;

                // Guarda el token en el localStorage
                AuthHelper.setToken(authToken);

                // Actualiza la instancia de Axios para que envíe las próximas peticiones con el token
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + authToken;

                return {
                    'status': 'ok',
                    'token': authToken
                };
            }
        }).catch((error) => {

            let errorMessage = '';

            if (error.response.status === 401) {
                errorMessage = 'Error, wrong credentials';
            } else {
                errorMessage = error.response.data.message;
            }

            throw {
                'status': 'error',
                'error': errorMessage
            };
        });

    }

    /**
     * Logout user
     */
    logout()
    {
        AuthHelper.removeToken();
        NotificationService.add('success', null, 'Logout successful');
    }
}

export default AuthService;
