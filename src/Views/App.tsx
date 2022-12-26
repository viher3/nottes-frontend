import React from 'react'
import '../App.css'

import {Col, Row} from "react-bootstrap"
import Container from 'react-bootstrap/Container'
import {AppRoutes} from "../Config/Router/Routes"
import {AppNavbar} from "./Shared/Navbar/AppNavbar"
import {ReactQueryDevtools} from 'react-query/devtools'
import {BrowserRouter as Router} from "react-router-dom"
import {QueryClient, QueryClientProvider} from "react-query"

export const App: React.FC = () => {

    const queryClient = new QueryClient()

    return (
        <Router>
            <QueryClientProvider client={queryClient}>
                <Container fluid className={"mx-0"}>
                    <Row>
                        <Col xs={12} sm={12} md={3} xl={2} className={"px-0"}>
                            <AppNavbar/>
                        </Col>
                        <Col xs={12} sm={12} md={9} xl={10} className={"right-wrapper"}>
                            <AppRoutes/>
                        </Col>
                    </Row>
                </Container>

                {process.env.REACT_APP_ENV === 'dev' &&
                    <ReactQueryDevtools initialIsOpen={false}/>
                }

            </QueryClientProvider>
        </Router>
    );
}
