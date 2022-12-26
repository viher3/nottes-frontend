import {useQuery} from "react-query"
import React, {useState} from "react"
import {Col, Row} from "react-bootstrap"
import {ActionDropdown} from "../Dashboard/ActionDropdown"
import {getFoldersQuery} from "../../Api/Query/FolderQuery"
import {SimpleTable} from "../../Components/Table/SimpleTable"
import {FolderContent} from "../../Model/FolderContent/FolderContent"
import {FolderContentIconName} from "../../Components/FolderContent/FolderContentIconName"

interface Props {
    folderId: string
}

export const FolderView: React.FC<Props> = (props) => {

    const [folderContent, setFolderContent] = useState<FolderContent[]>([])
    const {isLoading} = useQuery(['folderContent'], () => getFoldersQuery(props.folderId), {
        onSuccess: (res) => {
            setFolderContent(res.data)
        },
        onError: (err) => {

        },
    })

    const tableHeaders = () => {
        return (
            <>
                <th>Name</th>
                <th className={"text-right"}>
                    Updated at
                </th>
            </>
        )
    }

    return (
        <>
            <ActionDropdown/>
            <Row className={"mt-4"}>
                <Col>
                    <SimpleTable
                        attrs={{hover: true}}
                        headers={tableHeaders()}
                        loading={isLoading}
                        totalColumns={2}
                    >
                        {
                            folderContent.map((content: any, key: number) => {
                                return (
                                    <tr
                                        key={key}
                                        onClick={() => console.log('dclick')}
                                    >
                                        <td width={"80%"}>
                                            <FolderContentIconName folderContent={content}/>
                                        </td>
                                        <td align={"right"}>{content.updatedAt}</td>
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
