import Dashboard from 'Views/Dashboard';
import Login from "Views/Authentication/Login";
import Logout from "Views/Authentication/Logout";
import CreateDocument from "Views/Notte/CreateDocument";
import ShowDocument from "Views/Notte/ShowDocument";

export const RoutesPath = {
    'dashboard' : '/',
    'showDocument' : '/show/:id',
    'createDocument' : '/add',
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
        path: RoutesPath.showDocument,
        exact: true,
        component: ShowDocument
    },
    {
        path : RoutesPath.createDocument,
        exact: true,
        component: CreateDocument
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
