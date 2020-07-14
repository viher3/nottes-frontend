import React from 'react';
import NotteManager from 'Managers/NotteManager';
import ActionsDropdown from 'Components/Dashboard/ActionsDropdown';
import NotteList from "Components/Notte/NotteList";
import NotteListItemContextMenu from 'Components/Menu/NotteListItemContextMenu';

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
                <div className="col-12 col-xl-9 col-lg-9 col-md-9 col-sm-9">
                    <p>Listing {this.state.listing.current} of {this.state.listing.total}</p>
                </div>
                <div className="col-12 col-xl-3 col-lg-3 col-md-3 col-sm-3 text-xl-right text-lg-right text-md-right text-sm-right mb-xl-0 mb-2">
                    <ActionsDropdown refreshCallback={this.list} />
                </div>
                <div className="col-12">
                {
                    this.state.data.length === 0 ?
                        (<p>No results were found.</p>) :
                        ( this.state.data.map((item) => <NotteList history={this.props.history} key={item.id} item={item} />
                        ))
                }
                </div>
                <NotteListItemContextMenu refreshMethod={this.list} history={this.props.history} />
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
        }).catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.list();
    }
}

export default Dashboard;
