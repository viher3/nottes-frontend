import React from 'react';
import {withRouter} from 'react-router-dom'
import {RoutesPath} from 'Constants/Routes';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faPlusCircle,
    faRedo,
    faFileUpload,
    faLink,
    faFileAlt
} from '@fortawesome/free-solid-svg-icons';

import {
    Spinner,
    Button,
    ButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import NotteManager from "Managers/NotteManager";

class ActionsDropdown extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isDropdownOpen: false,
            isRefreshing : false
        };
    }

    render() {
        return (
            <div>
                <Button onClick={this.refreshList} color="info" size="sm" className="mr-1">
                    <div>
                    {
                        (true === this.state.isRefreshing) ?
                            ( <Spinner size="sm" color="white" /> ) :
                            ( <FontAwesomeIcon icon={faRedo}/> )
                    }
                        <span className="ml-2">Refresh</span>
                    </div>
                </Button>
                <ButtonDropdown
                    isOpen={this.state.isDropdownOpen}
                    toggle={this.toggleActionsDropdown}
                    size="sm"
                    className="text-center"
                >
                    <DropdownToggle color="primary" caret>
                        <FontAwesomeIcon icon={faPlusCircle} className="mr-2"/>
                        <span className="mr-2">New</span>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={() => this.props.history.push(RoutesPath.createDocument)}>
                            <FontAwesomeIcon icon={faFileAlt} className="mr-3"/>
                            <span>Document</span>
                        </DropdownItem>
                        <DropdownItem>
                            <FontAwesomeIcon icon={faLink} className="mr-3"/>
                            <span>Link</span>
                        </DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem>
                            <FontAwesomeIcon icon={faFileUpload} className="mr-3"/>
                            <span>File upload</span>
                        </DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            </div>
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

    refreshList = async () => {
        this.setState({ isRefreshing : true })

        let notteManager = new NotteManager()
        await notteManager.list().then(response => {
            this.props.refreshCallback({
                loading: false,
                listing: {
                    current: response.data.current_page_number * response.data.num_items_per_page,
                    total: response.data.total_count
                },
                data: response.data.items
            })
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            this.setState({ isRefreshing : false })
        })
    }
}

export default withRouter(ActionsDropdown);
