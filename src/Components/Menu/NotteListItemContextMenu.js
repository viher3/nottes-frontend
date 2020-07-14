import React from "react"
import {ContextMenu, MenuItem} from "react-contextmenu"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faEye, faEdit, faTrash} from '@fortawesome/free-solid-svg-icons'
import {RoutesPath} from 'Constants/Routes'
import NotteManager from 'Managers/NotteManager'
import Notification from 'Services/Common/NotificationService'

class NotteListItemContextMenu extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
    }

    render() {
        return (
            <ContextMenu id="notteListItemMenu">
                <MenuItem data={{route: RoutesPath.showDocument}} onClick={this.handleClick}>
                    <FontAwesomeIcon className="mr-1" icon={faEye}/> Open
                </MenuItem>
                <MenuItem data={{route: '_'}} onClick={this.handleClick}>
                    <FontAwesomeIcon className="mr-1" icon={faEdit}/> Edit
                </MenuItem>
                <MenuItem divider/>
                <MenuItem data={{action: 'remove'}} onClick={this.handleClick}>
                    <FontAwesomeIcon className="mr-1" icon={faTrash}/> Remove
                </MenuItem>
            </ContextMenu>
        );
    }

    handleClick(e, data) {
        console.log(data)
        if(data.route === RoutesPath.showDocument) {
            this.props.history.push(data.route + data.id)
        }

        if(typeof data.action !== 'undefined' && data.action === 'remove') {
            this.removeNotte(data.id)
        }
    }

    removeNotte = async(id) => {
        let notteManager = new NotteManager()
        await notteManager.remove(id).then(response => {
            this.props.refreshMethod()
            Notification.add('success', 'Remove', 'Item was removed successfully!')
        }).catch(error => {
            console.log(error)
        })
    }
}

export default NotteListItemContextMenu;
