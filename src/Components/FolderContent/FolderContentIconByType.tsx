import React, {useState} from "react"
import {faFolder} from "@fortawesome/free-solid-svg-icons/faFolder"
import {faFileText} from "@fortawesome/free-solid-svg-icons/faFileText"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

interface Props {
    contentType: string
}

export const FolderContentIconByType: React.FC<Props> = (props) => {

    return (
        <>
            {
                props.contentType.toLowerCase() === 'folder' &&
                <FontAwesomeIcon icon={faFolder} className={"button-icon"} />
            }
            {
                props.contentType.toLowerCase() === 'text' &&
                <FontAwesomeIcon icon={faFileText} className={"button-icon"} />
            }
        </>
    )
}
