import React from 'react'
import HtmlToReact from 'html-to-react'
import Container from 'Views/Container'
import NotteManager from 'Managers/NotteManager'

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

                { this.state.notte.name ? (
                    <div>
                        <h1>{this.state.notte.name}</h1>
                        <hr />
                    </div>
                    ) : ('')
                }

                <article>{this.state.notte.content}</article>

                { this.state.notte.tags ?
                    (<div>
                        <hr />
                        <strong>Tags:</strong> {this.state.notte.tags}
                    </div>
                    ):('')
                }
            </Container>
        );
    }

    _getNotte(id) {
        this.notteManager.get(id).then((response) => {
            if(response.status === 200) {
                if(response.data.content) {
                    response.data.content = this.htmlParser.parse(response.data.content)
                }

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
