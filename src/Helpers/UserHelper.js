import AuthHelper from "Helpers/AuthHelper";
import JwtHelper from "Helpers/JwtHelper";

class UserHelper
{
    static getUser()
    {
        let authToken = AuthHelper.getToken();

        if(null === authToken) {
            return {};
        }

        return JwtHelper.decodeToken(authToken);
    }
}

export default UserHelper;