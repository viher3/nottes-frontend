import React from 'react';
import {Tooltip as ReactstrapTooltip} from 'reactstrap';

class Tooltip extends React.Component
{
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            tooltipOpen: false
        };
    }

    toggle() {
        this.setState({
            tooltipOpen: !this.state.tooltipOpen
        });
    }

    getId() {
        return 'ttp' + this.props.id;
    }

    render() {
        return (
            <div>
                <span id={this.getId()}>{this.props.children}</span>
                <ReactstrapTooltip
                    placement={this.props.placement}
                    isOpen={this.state.tooltipOpen}
                    target={this.getId()}
                    toggle={this.toggle}>
                    {this.props.content}
                </ReactstrapTooltip>
            </div>
        );
    }
}

export default Tooltip;