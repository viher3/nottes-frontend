import React from "react";
import Nav from 'react-bootstrap/Nav';
import {useNavigate} from "react-router-dom"
import {ROUTE_PATHS} from "../../../Config/Router/Routes";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHome} from "@fortawesome/free-solid-svg-icons/faHome";
import {Navbar} from "react-bootstrap";
import Container from "react-bootstrap/Container";

export const AppNavbar: React.FC = () => {

    const navigate = useNavigate()

    const NavItems = () => {
        return (
            <>
                <Nav.Link onClick={() => navigate(ROUTE_PATHS.DASHBOARD)}>
                    <FontAwesomeIcon icon={faHome} />
                    <span className={"px-3"}>Home</span>
                </Nav.Link>
            </>
        )
    }

    return (
        <>
            <Nav className="d-none d-md-block sidebar"
                 activeKey="/"
                 onSelect={selectedKey => alert(`selected ${selectedKey}`)}
            >
                <div className="sidebar-sticky"></div>
                <Nav.Item>
                    <NavItems />
                </Nav.Item>
            </Nav>

            <Navbar id={"mobileNavbar"} bg="dark" expand="xl">
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse
                        id="basic-navbar-nav"
                        className={"mt-3 mx-3"}
                    >
                        <NavItems />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
