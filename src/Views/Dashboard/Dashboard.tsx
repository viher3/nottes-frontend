import React from "react"
import {FolderView} from "../Folder/FolderView"

export const Dashboard: React.FC = () => {

    return (
        <>
            <h2>Dashboard</h2>
            <hr/>
            <FolderView folderId={"0"}/>
        </>
    )
}
