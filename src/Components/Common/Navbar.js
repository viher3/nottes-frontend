import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faUser, faCog } from '@fortawesome/free-solid-svg-icons';

import {
    Nav,
    NavItem,
    Navbar as BNavbar,
    NavLink,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class Navbar extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isOpen : false,
            user: '.'
        };
    }

    render(){
        return(
            <div className="row border-bottom white-bg">
                <BNavbar className="navbar navbar-expand-lg navbar-static-top" role="navigation">
                    <NavbarBrand href="/" className="navbar-brand">
                        <img className="logo" alt="logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} >
                        <FontAwesomeIcon icon={faBars} />
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar className="">
                        <Nav className="mr-auto nav" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Dropdown menu
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem className="nav-link">
                                        Option 1
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            <NavItem>
                                <NavLink href="#">Another link</NavLink>
                            </NavItem>
                        </Nav>
                        <Nav className="mr-right nav" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <FontAwesomeIcon icon={faUser} />
                                    <span className="ml-2">Hello,user</span>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem className="nav-link">
                                        <Link to="/config">
                                            <FontAwesomeIcon icon={faCog} />
                                            <span className="ml-2">Configuración</span>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-link">
                                        <Link to="/logout">
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            <span className="ml-2">Salir</span>
                                        </Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </BNavbar>
            </div>
        );
    }

    toggle = () => {

        this.setState({
            isOpen: (! this.state.isOpen)
        });
    }
}

export default Navbar;