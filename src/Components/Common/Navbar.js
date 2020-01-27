import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faUser, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';

import {
    Nav,
    Navbar as BNavbar,
    NavbarBrand,
    NavbarToggler,
    Collapse,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    InputGroup,
    InputGroupAddon,
    Input,
    Button
} from 'reactstrap';

class Navbar extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {
            isOpen : false,
            user : '.',
            isSearchActive : false
        };
    }

    render(){
        return(
            <div id="navbar_container" className="row border-bottom white-bg">
                <BNavbar className="navbar navbar-expand-lg navbar-static-top col-12" role="navigation">
                    <NavbarBrand href="/" className="navbar-brand">
                        <img className="logo" alt="logo" />
                    </NavbarBrand>
                    <NavbarToggler onClick={this.toggle} >
                        <FontAwesomeIcon icon={faBars} />
                    </NavbarToggler>
                    <Collapse isOpen={this.state.isOpen} navbar className="">
                        <Nav className="mr-auto nav ml-3" navbar>
                            <Input placeholder="Search" />
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
                                            <span className="ml-2">Configuration</span>
                                        </Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem className="nav-link">
                                        <Link to="/logout">
                                            <FontAwesomeIcon icon={faSignOutAlt} />
                                            <span className="ml-2">Logout</span>
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

    onFocusInSearch = () => {
        this.setState({
            isSearchActive: true
        });
    }

    onFocusSearchOut = () => {
        this.setState({
            isSearchActive: false
        });
    }
}

export default Navbar;
