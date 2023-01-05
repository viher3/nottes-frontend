import React, {useState} from "react"
import {useNavigate, useParams} from "react-router-dom"
import {LocalStorage} from "../../../Services/LocalStorage/LocalStorage"
import {RefreshSpinIcon} from "../../../Components/Icons/RefreshSpinIcon"
import {FolderBreadcrumb} from "../../../Components/FolderContent/FolderBreadcrumb"
import {Button, Col, Form,  Row} from "react-bootstrap"
import {useMutation} from "react-query";
import {
    createFolderMutation,
    CreateFolderMutationBody
} from "../../../Api/Mutation/FolderMutation"
import {Notificator} from "../../../Services/Notificator/Notificator"
import {ROUTE_PATHS} from "../../../Config/Router/Routes"

export const UpdateFolderView: React.FC = () => {
    const {parentId} = useParams()
    const localStorage = new LocalStorage()
    const navigate = useNavigate()

    const [saving, setSaving] = useState<boolean>(false)
    const [validated, setValidated] = useState<boolean>(false)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')



    const mutation = useMutation({
        mutationFn: (body: CreateFolderMutationBody) => createFolderMutation(body),
        onSettled: () => setSaving(false),
        onSuccess: () => {
            Notificator.success(`Folder <strong>${name}</strong> has been created correctly.`)
            navigate(ROUTE_PATHS.VIEW_FOLDER.replace(":id", parentId ? parentId.toString() : ''))
        },
        onError: (error: any) => {
            console.log(error, 'err')
            Notificator.error(error.response.data.error, error.message)
        }
    })

    const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
        const form = event.currentTarget

        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        setValidated(true)

        if (name.length) {
            createFolder()
        }

        event.preventDefault()
        event.stopPropagation()
    }

    const createFolder = (): void => {
        setSaving(true)
        mutation.mutate({
            name: name,
            parentId: parentId ?? '',
            description: description
        })
    }

    return (
        <>
            <h2>Edit folder</h2>
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
                                autoFocus
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
                                    {saving && <RefreshSpinIcon/>}
                                    {!saving && 'Save changes'}
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
        </>
    )
}
