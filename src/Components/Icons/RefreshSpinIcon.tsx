import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faRefresh} from "@fortawesome/free-solid-svg-icons/faRefresh"

export const RefreshSpinIcon: React.FC = () => {
    return (
        <>
            <FontAwesomeIcon icon={faRefresh} spin />
        </>
    )
}
