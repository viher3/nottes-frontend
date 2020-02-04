import React from 'react';

class ListingCountText extends React.Component {

    constructor(props) {
        super(props);
        this.setState({
            current: 0,
            total: 0
        });
    }

    render() {
        return (
            <div>
                <p>Listing {this.state.current} of {this.state.total}</p>
            </div>
        );
    }

    _calculate = () => {

        let current = 0;

        if(this.props.list.current > 0 && this.props.itemsCount) {
            current = this.props.listing.current;
        }

        this.setState({
            current: current,
            total: this.props.list.total
        });
    }

    componentDidMount() {
        this._calculate();
    }
}

export default ListingCountText;
