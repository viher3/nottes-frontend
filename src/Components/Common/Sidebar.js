import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTrash, faShareAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { withRouter } from "react-router-dom";
import { RoutesPath } from 'Constants/Routes';
import {
    ListGroup,
    ListGroupItem
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
            <ListGroup className="sidebar">
                <ListGroupItem color="info" onClick={() => this.props.history.push(RoutesPath.dashboard)}>
                    <FontAwesomeIcon icon={ faHome } className="mr-3" />Home
                </ListGroupItem>
                <ListGroupItem tag="a" href="#">
                    <FontAwesomeIcon icon={ faShareAlt } className="mr-3" />Shared
                </ListGroupItem>
                <ListGroupItem tag="a" href="#">
                    <FontAwesomeIcon icon={ faClock } className="mr-3" />Recently seen
                </ListGroupItem>
                <ListGroupItem tag="a" href="#">
                    <FontAwesomeIcon icon={ faTrash } className="mr-3" />Trash
                </ListGroupItem>
            </ListGroup>
        );
    }
}

export default withRouter(Sidebar);
