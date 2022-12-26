import React, {useState} from "react"
import {useParams} from "react-router-dom"
import {FolderDetail} from "../../Components/FolderContent/FolderDetail"

export const FolderView: React.FC = () => {

    const {id} = useParams()

    return (
        <>
            id: {id}
            <FolderDetail
                folderId={id ? id.toString() : '0'}
            />
        </>
    )
}
