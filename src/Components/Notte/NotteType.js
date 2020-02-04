import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileAlt, faLink} from '@fortawesome/free-solid-svg-icons';
import { NOTTE } from 'Constants/Notte';

class NotteType extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {this.getIcon()}
            </div>
        );
    }

    /**
     * Get icon for given type
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
            return <FontAwesomeIcon icon={icon} className="ml-2"/>;
        }

        return '';
    }
}

export default NotteType;
