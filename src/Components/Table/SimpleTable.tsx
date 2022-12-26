import React from "react";
import {Table} from "react-bootstrap";
import {TotalRecordsText} from "./TotalRecordsText";
import {LoadingSpinner} from "../Loading/LoadingSpinner";

interface Props {
    headers: string[],
    children: any,
    loading: boolean,
    totalItems: number,
    totalRecords: number
}

export const SimpleTable: React.FC<Props> = (props) => {

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {props.headers.map(header => <th>{header}</th>)}
                    </tr>
                </thead>
                <tbody className={"simpleTable"}>

                {!props.children &&
                    <tr key={"0"}>
                        <td colSpan={props.headers.length} className={"text-center my-4 py-4"}>
                            {props.loading && <LoadingSpinner/>}
                        </td>
                    </tr>
                }

                {props.children}

                </tbody>
            </Table>

            <TotalRecordsText totalItems={props.totalItems} totalRecords={props.totalRecords} />
        </>
    )
}
