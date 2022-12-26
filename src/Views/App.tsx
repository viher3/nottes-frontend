import React from 'react'
import '../App.css'

import Container from 'react-bootstrap/Container';
import {AppNavbar} from "./Shared/Navbar/AppNavbar";
import {AppRoutes} from "../Config/Router/Routes";
import {BrowserRouter as Router} from "react-router-dom"
import {Col, Row} from "react-bootstrap";

export const App: React.FC = () => {
    return (
        <Router>
            <Container fluid={true} className={"mx-0"}>
                <Row>
                    <Col sm={2} className={"px-0"}>
                        <AppNavbar/>
                    </Col>
                    <Col xs={12}  sm={10} className={"right-wrapper"}>
                        <AppRoutes/>
                    </Col>
                </Row>
            </Container>
        </Router>
    );
}
