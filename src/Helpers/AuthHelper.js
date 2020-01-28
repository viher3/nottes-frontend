const ITEM = 'Authorization';

class AuthHelper
{
    static getToken = () => {
        return window.localStorage.getItem(ITEM);
    }

    static setToken = (token) => {
        window.localStorage.setItem(ITEM, token);
    }

    static removeToken = () => {
        window.localStorage.removeItem(ITEM);
    }
}

export default AuthHelper;