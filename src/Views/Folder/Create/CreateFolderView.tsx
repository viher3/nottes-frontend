import React from "react";
import {BreadcrumbItemProps, Col, Row} from "react-bootstrap";
import {useNavigate, useParams} from "react-router-dom";
import {FolderBreadcrumb} from "../../../Components/FolderContent/FolderBreadcrumb";
import {LocalStorage} from "../../../Services/LocalStorage/LocalStorage";

interface Props {
    parentFolder?: string
}

export const CreateFolderView: React.FC<Props> = (props) => {
    const {parentId} = useParams()
    const localStorage = new LocalStorage()

    return (
        <>
            <h2>Create a new folder</h2>
            <hr/>
            <FolderBreadcrumb
                breadcrumb={JSON.parse(localStorage.get('folderBreadcrumb'))}
                allLinks={true}
            />
            <Row className={"mt-4"}>
                <Col>
                    {parentId}
                </Col>
            </Row>
        </>
    )
}
