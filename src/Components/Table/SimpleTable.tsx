import React from "react"
import {Table} from "react-bootstrap"
import {TotalRecordsText} from "./TotalRecordsText"
import {LoadingSpinner} from "../Loading/LoadingSpinner"

interface Props {
    headers: JSX.Element,
    children: JSX.Element[],
    loading: boolean,
    totalItems?: number,
    totalRecords?: number,

    attrs?: object,

    totalColumns?: number
}

export const SimpleTable: React.FC<Props> = (props) => {

    return (
        <>
            <Table {...props.attrs}>
                <thead>
                <tr>
                    {props.headers}
                </tr>
                </thead>
                <tbody className={"simpleTable"}>
                {
                    (!props.children || !props.children.length) &&
                    <tr key={"0"}>
                        <td
                            className={"text-center my-4 py-4"}
                            colSpan={props.totalColumns ? props.totalColumns : 0}
                        >
                            {props.loading && <LoadingSpinner/>}
                            {!props.loading && "No results found"}
                        </td>
                    </tr>
                }

                {props.children}

                </tbody>
            </Table>

            {props.totalItems && props.totalRecords &&
                <TotalRecordsText totalItems={props.totalItems} totalRecords={props.totalRecords}/>
            }
        </>
    )
}
