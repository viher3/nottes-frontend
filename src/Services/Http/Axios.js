import axios from 'axios';
import AuthHelper from 'Helpers/AuthHelper';
import NotificationService from 'Services/Common/NotificationService';

const EXPIRED_TOKEN_MESSAGE = 'Expired JWT Token';

const instance = axios.create({
    baseURL: process.env.API_ENDPOINT
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

/**
 * Add JWT if exists
 */
if (null !== AuthHelper.getToken()) {
    instance.defaults.headers.common['Authorization'] = 'Bearer ' + AuthHelper.getToken();
}

/**
 * HTTP requests interceptor
 */
instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Si ha expirado el JWT, redirigimos a la pantalla de login
    if (error.response.status === 401) {
        if (error.response.data && error.response.data.message === EXPIRED_TOKEN_MESSAGE) {
            NotificationService.add('warning', 'Aviso', 'Tu sesión ha expirado');
            AuthHelper.removeToken();
        }
    } else {
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
});

export default instance;
