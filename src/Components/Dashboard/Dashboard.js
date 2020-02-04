import React from 'react';
import NotteManager from 'Managers/NotteManager';
import NotteName from 'Components/Notte/NotteName';

import {
    Table
} from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileAlt, faShieldAlt } from '@fortawesome/free-solid-svg-icons'

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
        return (
            <section>
                <p>Listing {this.state.listing.current} of {this.state.listing.total}</p>

                <Table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Tags</th>
                        <th>Last update</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>

                    {
                        this.state.data.length === 0 ? (
                                <tr>
                                    <td colSpan="5">No results were found.</td>
                                </tr>
                            ) :
                            (
                                this.state.data.map((item) =>
                                    <tr key={item.id}>
                                        <td>
                                            <NotteName item={item} />
                                        </td>
                                        <td>{item.type}</td>
                                        <td>{item.tags}</td>
                                        <td>{item.updatedAt}</td>
                                        <td>
                                            <FontAwesomeIcon icon={faFileAlt} />
                                        </td>
                                    </tr>
                                )
                            )
                    }
                    </tbody>
                </Table>
            </section>
        );
    }

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
