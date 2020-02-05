import Dashboard from 'Views/Dashboard';
import Login from "Views/Authentication/Login";
import Logout from "Views/Authentication/Logout";

export const RoutesPath = {
    'dashboard' : '/',
    'login' : '/login',
    'logout' : '/logout'
};

export const PrivateRoutes = [
    {
        path : RoutesPath.dashboard,
        exact: true,
        component: Dashboard
    },
    {
        path : RoutesPath.logout,
        exact: true,
        component: Logout
    }
];

export const Routes = [
    {
        path : RoutesPath.login,
        exact: true,
        component: Login
    }
];