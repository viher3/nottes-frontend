import React, {useState} from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFolder} from "@fortawesome/free-solid-svg-icons/faFolder"
import {FolderContent} from "../../Model/FolderContent/FolderContent"
import {faFileText} from "@fortawesome/free-solid-svg-icons/faFileText"
import {FOLDER_CONTENT_TYPE_FOLDER, FOLDER_CONTENT_TYPE_TEXT} from "../../Model/FolderContent/FolderContentType"

interface Props {
    folderContent: FolderContent
}

export const FolderContentIconName: React.FC<Props> = (props) => {

    return (
        <>
            {
                props.folderContent.type.toLowerCase() === FOLDER_CONTENT_TYPE_FOLDER &&
                <FontAwesomeIcon icon={faFolder} className={"button-icon"} />
            }
            {
                props.folderContent.type.toLowerCase() === FOLDER_CONTENT_TYPE_TEXT &&
                <FontAwesomeIcon icon={faFileText} className={"button-icon"} />
            }
            {props.folderContent.name}
        </>
    )
}
