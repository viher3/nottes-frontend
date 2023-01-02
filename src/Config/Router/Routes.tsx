import React from "react";
import {useRoutes} from "react-router-dom";
import {Dashboard} from "../../Views/Dashboard/Dashboard";
import {FolderView} from "../../Views/Folder/FolderView";
import {CreateFolderView} from "../../Views/Folder/Create/CreateFolderView";

export const ROUTE_PATHS = {
    DASHBOARD : "/",
    VIEW_FOLDER : "/folder/:id",
    CREATE_FOLDER : "/folder/:parentId/create",
}

export const AppRoutes = () => {
    return useRoutes([
        {path: ROUTE_PATHS.DASHBOARD, element: <Dashboard/>},
        {path: ROUTE_PATHS.VIEW_FOLDER, element: <FolderView/>},
        {path: ROUTE_PATHS.CREATE_FOLDER, element: <CreateFolderView/>}
    ])
};
