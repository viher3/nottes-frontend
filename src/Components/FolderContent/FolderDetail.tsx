import {useMutation, useQuery} from "react-query"
import React, {useEffect, useState} from "react"
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
import {
    Item,
    Separator,
    useContextMenu
} from "react-contexify"
import {ContextMenu} from "./ContextMenu";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons/faTrash";
import {faEdit} from "@fortawesome/free-solid-svg-icons/faEdit";
import {faPlusSquare} from "@fortawesome/free-solid-svg-icons/faPlusSquare";
import {removeFolderMutation} from "../../Api/Mutation/FolderMutation";
import {Notificator} from "../../Services/Notificator/Notificator";

interface Props {
    folderId: string,
    folderName?: string
}

export const FolderDetail: React.FC<Props> = (props) => {

    const localStorage = new LocalStorage()
    const navigate = useNavigate()
    const {
        isLoading,
        isError,
        data,
        error,
        refetch
    } = useQuery(['folderContent'], () => getFoldersQuery(props.folderId))

    const removeMutation = useMutation({
        mutationFn: (folderId: string) => removeFolderMutation(folderId),
        onSuccess: () => {
            Notificator.success(`Folder <strong>${selectedItem?.name}</strong> has been removed correctly.`)
            refetch()
        },
        onError: (error: any) => {
            Notificator.error(error.response.data.error, error.message)
        }
    })

    const removeFolder = (folderContent: FolderContent) => removeMutation.mutate(folderContent.id)

    useEffect(() => {
        refetch()
    }, [props.folderId])

    useEffect(() => {
        const breadcrumb = data?.data.breadcrumb ?? []
        localStorage.set('folderBreadcrumb', JSON.stringify(breadcrumb))
    }, [data])

    const MENU_ID = 'testMenu'

    const contextMenuRef = React.useRef<any>(null)

    const {show} = useContextMenu({id: MENU_ID});
    const [isMenuVisible, setMenuVisible] = useState<boolean>(false)
    const [selectedItem, setSelectedItem] = useState<FolderContent | null>(null)

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

    window.oncontextmenu = function (e: any) {
        e.preventDefault()

        if (typeof e.path[1] === 'undefined') {
            return
        }

        const parentElement = e.path[1]

        if (!parentElement.attributes.length) {
            return
        }

        if (parentElement.attributes[0].value === 'folderContentItem') {
            const itemKey = parentElement.attributes[1].value

            const folderContent = data?.data.content.filter((content: FolderContent, key: number) => parseInt(itemKey) === key)
            setSelectedItem(folderContent[0])

            // Show context menu
            contextMenuRef.current.open(e)
        }
    }

    const onContextMenuVisibilityChange = (isVisible : boolean) => {
        setMenuVisible(isVisible)

        if (!isVisible) {
            setSelectedItem(null)
        }
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
            <hr/>
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
                                            data-type={"folderContentItem"}
                                            data-key={key}
                                            className={selectedItem?.id === content.id ? "bg-grey" : ""}
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

            <ContextMenu
                ref={contextMenuRef}
                onVisibilityChange={onContextMenuVisibilityChange}
            >
                <Item onClick={() => selectedItem ? open(selectedItem, navigate) : null}>
                    <FontAwesomeIcon icon={faPlusSquare} className={"button-icon"} />
                    Open
                </Item>
                <Item>
                    <FontAwesomeIcon icon={faEdit} className={"button-icon"} />
                    Edit
                </Item>
                <Separator/>
                <Item onClick={() => selectedItem ?  removeFolder(selectedItem) : null}>
                    <FontAwesomeIcon icon={faTrash} className={"button-icon"} />
                    Remove
                </Item>
            </ContextMenu>
        </>
    )
}
