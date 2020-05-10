import React from 'react';
import Moment from "react-moment";
import NotteName from "Components/Notte/NotteName";
import { ContextMenuTrigger } from "react-contextmenu";
import {RoutesPath} from "Constants/Routes";

class NotteList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card item" onDoubleClick={() => this.props.history.push(RoutesPath.showDocument + this.props.item.id) }>
                <ContextMenuTrigger id="notteListItemMenu" collect={() => this.props.item}>
                    <div className="card-block">
                        <h4 className="card-title mt-3">
                            <NotteName item={this.props.item}/>
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
                    </div>
                </ContextMenuTrigger>
            </div>
        );
    }
}

export default NotteList;