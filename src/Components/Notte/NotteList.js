import React from 'react';
import Moment from "react-moment";
import NotteName from "Components/Notte/NotteName";
import { ContextMenuTrigger } from "react-contextmenu";
import {RoutesPath} from "Constants/Routes";
import Card from "reactstrap/es/Card";
import CardBody from "reactstrap/es/CardBody";
import CardTitle from "reactstrap/es/CardTitle";
import CardSubtitle from "reactstrap/es/CardSubtitle";
import CardText from "reactstrap/es/CardText";
import Button from "reactstrap/es/Button";

class NotteList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card item mb-3" onClick={() => this.props.history.push(RoutesPath.showDocument + this.props.item.id) }>
                <ContextMenuTrigger id="notteListItemMenu" collect={() => this.props.item}>
                    <div className="card-block">
                        <h4 className="card-title">
                            <NotteName item={this.props.item}/>
                        </h4>
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
