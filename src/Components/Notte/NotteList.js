import React from 'react';
import Moment from "react-moment";
import NotteName from "Components/Notte/NotteName";
import NotteType from "Components/Notte/NotteType";

class NotteList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-block">
                    <h4 className="card-title mt-3">
                        <NotteName item={this.props.item} />
                    </h4>
                    <div className="meta">
                        {this.props.item.tags}
                    </div>
                    <div className="card-text">...</div>
                </div>
                <div className="card-footer">
                    <small>
                        Last updated <Moment fromNow>{this.props.item.updated_at}</Moment>
                    </small>
                    <button className="btn btn-secondary float-right btn-sm">show</button>
                </div>
            </div>
        );
    }

}

export default NotteList;