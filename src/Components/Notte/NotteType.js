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
                {
                    true === this.props.tooltip ?
                    (
                        <Tooltip placement="top" content={this.getTranslation()} id={this.props.item.id}>
                            {this.getIcon()}
                        </Tooltip>
                    ) :
                    (
                        <span>
                            {this.getIcon('mr-2')}
                            {this.getTranslation()}
                        </span>
                    )
                }
            </div>
        );
    }

    /**
     * Get icon for given type
     * @returns {*}
     */
    getIcon(classes='') {

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
            return <FontAwesomeIcon icon={icon} className={classes} />;
        }

        return '';
    }

    /**
     * Get type translation
     * @returns {string}
     */
    getTranslation() {
        switch (this.props.item.type) {
            case NOTTE.TYPES.doc:
                return 'Document';

            case NOTTE.TYPES.link:
                return 'Link';

            default:
                return '';
        }
    }
}

export default NotteType;
