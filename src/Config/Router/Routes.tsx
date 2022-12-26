import React from "react";
import {useRoutes} from "react-router-dom";
import {Dashboard} from "../../Views/Dashboard/Dashboard";

export const ROUTE_PATHS = {
    DASHBOARD : "/"
}

export const AppRoutes = () => {
    return useRoutes([
        {path: ROUTE_PATHS.DASHBOARD, element: <Dashboard/>}
    ])
};
