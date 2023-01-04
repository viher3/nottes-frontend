import {useQuery} from "react-query"
import React, {useEffect} from "react"
import {Col, Row} from "react-bootstrap"
import {useNavigate} from "react-router-dom"
import {ActionDropdown} from "./ActionDropdown"
import {SimpleTable} from "../Table/SimpleTable"
import {open} from "../../Services/Folder/FolderService"
import {getFoldersQuery} from "../../Api/Query/FolderQuery"
import {FolderContentIconName} from "./FolderContentIconName"
import {FolderContent} from "../../Model/FolderContent/FolderContent"
import {FolderBreadcrumb} from "./FolderBreadcrumb";
import {LocalStorage} from "../../Services/LocalStorage/LocalStorage";

interface Props {
    folderId: string,
    folderName?: string
}

export const FolderDetail: React.FC<Props> = (props) => {

    const localStorage = new LocalStorage()
    const navigate = useNavigate()
    const {isLoading, isError, data, error, refetch} = useQuery(['folderContent'], () => getFoldersQuery(props.folderId))

    useEffect(() => {
        refetch()
    }, [props.folderId])

    useEffect(() => {
        const breadcrumb = data?.data.breadcrumb ?? []
        localStorage.set('folderBreadcrumb', JSON.stringify(breadcrumb))
    }, [data])

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
            {props.folderName &&
                <h2>{props.folderName}</h2>
            }
            <FolderBreadcrumb
                breadcrumb={data?.data.breadcrumb ?? []}
                allLinks={false}
            />
            <hr />
            <ActionDropdown
                folderId={props.folderId}
            />
            <Row className={"mt-4"}>
                <Col>
                    {!isError &&
                        <SimpleTable
                            attrs={{hover: true}}
                            headers={tableHeaders()}
                            loading={isLoading}
                            totalColumns={2}
                        >
                            {
                                data?.data.content.map((content: FolderContent, key: number) => {
                                    return (
                                        <tr
                                            key={key}
                                            onClick={() => open(content, navigate)}
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
                    }
                    <>{isError && error}</>
                </Col>
            </Row>
        </>
    )
}
