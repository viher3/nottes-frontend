import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faTimes} from "@fortawesome/free-solid-svg-icons";

interface Props {
    enabled: boolean
}

export const Enabled: React.FC<Props> = (props) => {
    return (
        <>
            {props.enabled ?
                <FontAwesomeIcon icon={faCheck} color={"green"} /> :
                <FontAwesomeIcon icon={faTimes} color={"red"} />
            }
        </>
    )
}
