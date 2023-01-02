import React, {useState} from "react";
import {Dropdown, Row} from "react-bootstrap";
import DropdownMenu from "react-bootstrap/DropdownMenu"
import DropdownItem from "react-bootstrap/DropdownItem"
import DropdownToggle from "react-bootstrap/DropdownToggle"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faFolder} from "@fortawesome/free-solid-svg-icons/faFolder"
import {faFileText} from "@fortawesome/free-solid-svg-icons/faFileText"
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle"
import {useNavigate} from "react-router-dom";
import {ROUTE_PATHS} from "../../Config/Router/Routes";

interface Props {
    folderId: string
}

export const ActionDropdown: React.FC<Props> = (props) => {

    const navigate = useNavigate()
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
    const toggle = () => setDropdownOpen((prevState : boolean) => !prevState);

    return (
        <>
            <Row>
                <Dropdown>
                    <DropdownToggle
                        variant={"dark"}
                    >
                        <FontAwesomeIcon icon={faPlusCircle} className={"button-icon"} />
                        Create
                    </DropdownToggle>
                    <DropdownMenu variant={"dark"}>
                        <DropdownItem
                            onClick={() => navigate(ROUTE_PATHS.CREATE_FOLDER.replace(":parentId", props.folderId))}
                        >
                            <FontAwesomeIcon icon={faFolder} className={"button-icon"} />
                            Folder
                        </DropdownItem>
                        <DropdownItem>
                            <FontAwesomeIcon icon={faFileText} className={"button-icon"} />
                            Text
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </Row>
        </>
    )
}
