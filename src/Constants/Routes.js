import Dashboard from 'Views/Dashboard';
import Login from "Views/Authentication/Login";
import Logout from "Views/Authentication/Logout";

export const PrivateRoutes = [
    {
        path : '/',
        exact: true,
        component: Dashboard
    },
    {
        path : '/logout',
        exact: true,
        component: Logout
    }
];

export const Routes = [
    {
        path : '/login',
        exact: true,
        component: Login
    }
];
