import React, {useEffect, useState} from "react"
import {ActionDropdown} from "./ActionDropdown"
import {SimpleTable} from "../../Components/Table/SimpleTable"
import {Col, Row} from "react-bootstrap"
import {getFoldersQuery} from "../../Api/Query/FolderQuery"
import {useQuery} from "react-query"
import {FolderContentIconByType} from "../../Components/FolderContent/FolderContentIconByType";

interface Props {

}

export const Dashboard: React.FC<Props> = (props) => {

    const [folderContent, setFolderContent] = useState<object[]>([])
    const { isLoading } = useQuery(['folderContent'], () =>  getFoldersQuery(),{
        onSuccess: (res) => {
            setFolderContent(res.data);
        },
        onError: (err) => {

        },
    })

    useEffect(() => {
        console.log(folderContent)
    }, [folderContent]);

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
                        loading={isLoading}
                        totalItems={0}
                        totalRecords={0}
                    >
                        {
                            folderContent.map((content: any, key: number) => {
                                return (
                                    <tr key={key}>
                                        <td>
                                            <FolderContentIconByType contentType={content.type} />
                                            {content.name}
                                        </td>
                                        <td>{content.updatedAt}</td>
                                        <td>

                                        </td>
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
