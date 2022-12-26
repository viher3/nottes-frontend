import React from "react"
import {FolderDetail} from "../../Components/FolderContent/FolderDetail"

export const Dashboard: React.FC = () => {

    return (
        <>
            <h2>Dashboard</h2>
            <hr/>
            <FolderDetail folderId={"0"}/>
        </>
    )
}
