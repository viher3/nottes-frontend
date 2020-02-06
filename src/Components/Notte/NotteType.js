import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileAlt, faLink} from '@fortawesome/free-solid-svg-icons';
import { NOTTE } from 'Constants/Notte';
import Tooltip from 'Components/Common/Tooltip';

class NotteType extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Tooltip placement="top" content={this.props.item.type} id={this.props.item.id}>
                    {this.getIcon()}
                </Tooltip>
            </div>
        );
    }

    /**
     * Get icon for given type
     *
     * @param typeId
     * @returns {*}
     */
    getIcon() {

        let icon = null;

        switch (this.props.item.type) {
            case NOTTE.TYPES.doc:
                icon = faFileAlt;
                break;

            case NOTTE.TYPES.link:
                icon = faLink;
                break;
        }

        if(null !== icon) {
            return <FontAwesomeIcon icon={icon} className="ml-2" />;
        }

        return '';
    }
}

export default NotteType;
