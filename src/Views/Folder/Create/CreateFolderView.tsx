import React, {useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {LocalStorage} from "../../../Services/LocalStorage/LocalStorage"
import {RefreshSpinIcon} from "../../../Components/Icons/RefreshSpinIcon"
import {FolderBreadcrumb} from "../../../Components/FolderContent/FolderBreadcrumb"
import {BreadcrumbItemProps, Button, Col, Form, FormGroup, Row} from "react-bootstrap"

interface Props {
    parentFolder?: string
}

export const CreateFolderView: React.FC<Props> = (props) => {
    const {parentId} = useParams()
    const localStorage = new LocalStorage()

    const [saving, setSaving] = useState<boolean>(false)
    const [validated, setValidated] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const handleSubmit = (event : React.ChangeEvent<HTMLFormElement>) => {
        const form = event.currentTarget

        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        setValidated(true)

        if(name.length){
            createFolder()
        }

        event.preventDefault()
        event.stopPropagation()
    }

    const createFolder = () : void => {
        setSaving(true)
    }

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
                    <Form
                        noValidate
                        validated={validated}
                        onSubmit={handleSubmit}
                    >
                        <Form.Group>
                            <Form.Label htmlFor={"name"}>Name</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                id={"name"}
                                placeholder="Enter a name"
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid">
                                Please choose a name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className={"mt-4"}>
                            <Form.Label htmlFor={"description"}>Description</Form.Label>
                            <Form.Control
                                as={"textarea"}
                                id={"description"}
                                type="text"
                                placeholder="Enter a description"
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Row className={"text-center"}>
                            <Col className={"col-12"}>
                                <Button
                                    variant="primary"
                                    type="submit"
                                    className={"mt-4"}
                                    disabled={saving}
                                >
                                    {saving && <RefreshSpinIcon /> }
                                    {!saving && 'Create' }
                                </Button>
                            </Col>
                        </Row>
                    </Form>

                    {parentId}
                </Col>
            </Row>
        </>
    )
}
