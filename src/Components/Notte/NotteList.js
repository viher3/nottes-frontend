import React from 'react';
import Moment from "react-moment";
import NotteName from "Components/Notte/NotteName";
import NotteType from "Components/Notte/NotteType";
import { ContextMenuTrigger } from "react-contextmenu";
import {RoutesPath} from "Constants/Routes";


class NotteList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card item mb-3" onClick={() => this.props.history.push(RoutesPath.showDocument + this.props.item.id) }>
                <ContextMenuTrigger id="notteListItemMenu" collect={() => this.props.item}>
                    <div className="card-block">
                        <div className="row">
                            <div className="col-12 col-xl-10 col-lg-10 col-md-10 col-sm-10">
                                <h4 className="card-title">
                                    <NotteName item={this.props.item}/>
                                </h4>
                            </div>
                            <div className="col-12 col-xl-2 col-lg-2 col-md-2 col-sm-2">
                                <h6 className="card-subtitle mb-2 text-muted text-xl-right">
                                    <NotteType item={this.props.item} />
                                </h6>
                            </div>
                        </div>
                        <div>
                            {this.props.item.tags}
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                {this.props.item.creator_user.username}
                            </div>
                            <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 text-right">
                                Last updated <Moment fromNow>{this.props.item.updated_at}</Moment>
                            </div>
                        </div>
                    </div>
                </ContextMenuTrigger>
            </div>
        );
    }
}

export default NotteList;
