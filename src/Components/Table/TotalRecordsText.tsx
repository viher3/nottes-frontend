import React from "react";

interface Props {
    totalItems: number,
    totalRecords: number
}

export const TotalRecordsText: React.FC<Props> = (props) => {
    return (
        <p>Showing {props.totalItems} for {props.totalRecords} records.</p>
    )
}
