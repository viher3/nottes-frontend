import React from "react";
import {useRoutes} from "react-router-dom";
import {Dashboard} from "../../Views/Dashboard/Dashboard";
import {FolderView} from "../../Views/Folder/FolderView";

export const ROUTE_PATHS = {
    DASHBOARD : "/",
    VIEW_FOLDER : "/folder/:id",
}

export const AppRoutes = () => {
    return useRoutes([
        {path: ROUTE_PATHS.DASHBOARD, element: <Dashboard/>},
        {path: ROUTE_PATHS.VIEW_FOLDER, element: <FolderView/>}
    ])
};
