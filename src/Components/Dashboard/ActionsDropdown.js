import React from 'react';
import {withRouter} from 'react-router-dom'
import { RoutesPath } from 'Constants/Routes';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faPlus,
    faFileUpload,
    faLink,
    faFileAlt
} from '@fortawesome/free-solid-svg-icons';

import {
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';

class ActionsDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDropdownOpen: false
        };
    }

    render() {
        return (
            <ButtonDropdown
                isOpen={this.state.isDropdownOpen}
                toggle={this.toggleActionsDropdown}
                size="sm"
                className="text-center"
            >
                <DropdownToggle caret>
                    <FontAwesomeIcon icon={faPlus} className="mr-2" />
                    <span className="mr-2">New</span>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem onClick={() => this.props.history.push(RoutesPath.createNotte)}>
                        <FontAwesomeIcon icon={faFileAlt} className="mr-3" />
                        <span>Document</span>
                    </DropdownItem>
                    <DropdownItem>
                        <FontAwesomeIcon icon={faLink} className="mr-3" />
                        <span>Link</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        <FontAwesomeIcon icon={faFileUpload} className="mr-3" />
                        <span>File upload</span>
                    </DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
        );
    }

    /**
     * Toggle actions dropdown
     */
    toggleActionsDropdown = () => {
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        })
    }
}

export default withRouter(ActionsDropdown);
