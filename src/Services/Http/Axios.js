import axios from 'axios';
import AuthHelper from 'Helpers/AuthHelper';
import NotificationService from 'Services/Common/NotificationService';
import { useHistory } from "react-router-dom";
import { RoutesPath } from 'Constants/Routes';

const EXPIRED_TOKEN_MESSAGE = 'Expired JWT Token';
const INVALID_TOKEN_MESSAGE = 'Invalid JWT Token';
const BAD_CREDENTIALS_MESSAGE = 'bad_credentials';

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

    let hasAction = false;

    // Redirect to login page if JWT has expired
    if (error.response.status === 401) {

        let errorMessage = '';
        let removeToken = false;

        if (error.response.data && error.response.data.message === EXPIRED_TOKEN_MESSAGE) {
            errorMessage = 'Your session has expired';
            removeToken = true;
            hasAction = true;
        }

        if (error.response.data && error.response.data.message === INVALID_TOKEN_MESSAGE) {
            errorMessage = 'Invalid authentication token';
            removeToken = true;
            hasAction = true;
        }

        if(errorMessage.length){
            NotificationService.add('warning', 'Warning', errorMessage);
        }

        if(removeToken) {
            AuthHelper.removeToken();

            let history = useHistory()
            history.push(RoutesPath.login)
        }
    }

    if(false === hasAction){
        return new Promise((resolve, reject) => {
            reject(error);
        });
    }
});

export default instance;
