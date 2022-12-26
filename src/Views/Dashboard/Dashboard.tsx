import React, {useEffect, useState} from "react"
import {ActionDropdown} from "./ActionDropdown"
import {SimpleTable} from "../../Components/Table/SimpleTable";
import {Col, Row} from "react-bootstrap";

interface Props {

}

export const Dashboard: React.FC<Props> = (props) => {

    const [folderContent, setFolderContent] = useState<object[]>([])

    return (
        <>
            <h2>Dashboard</h2>
            <hr/>
            <ActionDropdown/>

            <Row className={"mt-4"}>
                <Col>
                    <SimpleTable
                        headers={[
                            "Name",
                            "Updated at",
                            ""
                        ]}
                        loading={false}
                        totalItems={0}
                        totalRecords={0}
                    >
                        {
                            folderContent.map((content: any, key: number) => {
                                return (
                                    <tr key={key}>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                )
                            })
                        }
                    </SimpleTable>
                </Col>
            </Row>

        </>
    )
}
