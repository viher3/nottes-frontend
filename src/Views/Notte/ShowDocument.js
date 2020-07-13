import React from 'react'
import HtmlToReact from 'html-to-react'
import Container from 'Views/Container'
import NotteManager from 'Managers/NotteManager'
import NotteName from "Components/Notte/NotteName";
import NotteType from "Components/Notte/NotteType";
import Moment from "react-moment";
import {faUserCircle} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

class ShowDocument extends React.Component {

    constructor(props) {
        super();
        this.props = props
        this.notteManager = new NotteManager()
        this.htmlParser = HtmlToReact.Parser()
        this.state = {
            loading: true,
            notte: {}
        }
    }

    render() {
        return (
            <Container>
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-xl-10 col-lg-10 col-md-10 col-sm-10">
                                <h5 className="card-title">
                                    <NotteName item={this.state.notte}/>
                                </h5>
                            </div>
                            <div className="col-12 col-xl-2 col-lg-2 col-md-2 col-sm-2">
                                <h6 className="card-subtitle mb-2 text-muted text-xl-right text-lg-right text-md-right text-sm-right">
                                    <NotteType item={this.state.notte} />
                                </h6>
                            </div>
                        </div>
                        <div>
                            {this.state.notte.content}
                        </div>
                        <div>
                            { this.state.notte.tags ?
                                (<div>
                                        <hr />
                                        <strong>Tags:</strong> {this.state.notte.tags}
                                    </div>
                                ):('')
                            }
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="row">
                            <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                <FontAwesomeIcon icon={faUserCircle} className="mr-2" />
                                {this.state.notte.creator_username}
                            </div>
                            <div className="col-12 col-xl-6 col-lg-6 col-md-6 col-sm-6 text-right">
                                Last updated <Moment fromNow>{this.state.notte.updated_at}</Moment>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        );
    }

    _getNotte(id) {
        this.notteManager.get(id).then((response) => {
            console.log(response)
            if(response.status === 200) {
                if(response.data.content) {
                    response.data.content = this.htmlParser.parse(response.data.content)
                }

                response.data.creator_username = response.data.creator_user.username

                this.setState({notte: response.data})
            }

            this.setState({loading: false})
        })
    }

    componentDidMount() {
        this._getNotte(this.props.match.params.id)
    }

}

export default ShowDocument;
