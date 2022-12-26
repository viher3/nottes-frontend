import React, {useEffect, useState} from "react"
import {ActionDropdown} from "./ActionDropdown"

interface Props {

}

export const Dashboard: React.FC<Props> = (props) => {

    return (
        <>
            <h2>Dashboard</h2>
            <hr />
            <ActionDropdown />
        </>
    )
}
