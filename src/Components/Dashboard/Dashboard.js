import React from 'react';
import NotteManager from 'Managers/NotteManager';
import NotteName from 'Components/Notte/NotteName';
import NotteType from 'Components/Notte/NotteType';
import ActionsDropdown from 'Components/Dashboard/ActionsDropdown';
import ListingCountText from 'Components/Common/ListingCountText';
import Moment from 'react-moment';
import { Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Tooltip from 'Components/Common/Tooltip';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import NotteList from "Components/Notte/NotteList";

class Dashboard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: false,
            listing: {
                current: 0,
                total: 0
            }
        };

        this.notteManager = new NotteManager();
    }

    render() {

        // TODO: https://www.robinwieruch.de/react-warning-cant-call-setstate-on-an-unmounted-component
        // <ListingCountText list={this.state.listing} itemsCount={this.state.data} />
        return (
            <section id="dashboard_content" className="row notteList">
                <div className="col-12 col-xl-10 col-lg-10 col-md-10 pl-0">
                    <p>Listing {this.state.listing.current} of {this.state.listing.total}</p>
                </div>
                <div className="col-12 col-xl-2 col-lg-2 col-md-2 text-center">
                    <ActionsDropdown />
                </div>

                {
                    this.state.data.length === 0 ?
                        (<p>No results were found.</p>) :
                        ( this.state.data.map((item) => <NotteList key={item.id} item={item} /> ) )
                }

            </section>
        );
    }

    /**
     * Get item id with alias
     * @param itemId
     * @param alias
     * @returns {string}
     */
    getItemIdAlias = (itemId, alias) => {
        return alias + '_' + itemId;
    };

    /**
     * Get list data
     * @returns {Promise<void>}
     */
    list = async () => {

        this.setState({loading: true});

        await this.notteManager.list().then(response => {

            this.setState({
                loading: false,
                listing: {
                    current: response.data.current_page_number * response.data.num_items_per_page,
                    total: response.data.total_count
                },
                data: response.data.items
            });

            console.log(response);

        }).catch(error => {

        });
    }

    componentDidMount() {
        this.list();
    }
}

export default Dashboard;
