import React from "react";
import {ContextMenu, MenuItem} from "react-contextmenu";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye, faEdit, faShare, faTrash} from '@fortawesome/free-solid-svg-icons';
import {RoutesPath} from 'Constants/Routes';

class NotteListItemContextMenu extends React.Component {

    render() {
        return (
            <ContextMenu id="notteListItemMenu">
                <MenuItem data={{route: RoutesPath.showDocument}} onClick={this.handleClick}>
                    <FontAwesomeIcon className="mr-1" icon={faEye}/> Open
                </MenuItem>
                <MenuItem data={{route: '_'}} onClick={this.handleClick}>
                    <FontAwesomeIcon className="mr-1" icon={faEdit}/> Edit
                </MenuItem>
                <MenuItem data={{route: '_'}} onClick={this.handleClick}>
                    <FontAwesomeIcon className="mr-1" icon={faShare}/> Share
                </MenuItem>
                <MenuItem divider/>
                <MenuItem data={{route: '_'}} onClick={this.handleClick}>
                    <FontAwesomeIcon className="mr-1" icon={faTrash}/> Remove
                </MenuItem>
            </ContextMenu>
        );
    }

    handleClick(e, data) {
        console.log(data);
    }

}

export default NotteListItemContextMenu;