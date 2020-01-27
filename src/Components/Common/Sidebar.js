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

class Sidebar extends React.Component
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
            <p>TODO</p>
        );
    }
}

export default Sidebar;
