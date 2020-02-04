import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'

class NotteName extends React.Component {

    render() {
        return (
            <div>
                {this.props.item.name}
                {true === this.props.item.is_encrypted ? ( <FontAwesomeIcon icon={faShieldAlt} className="ml-2" /> ) : ('') }
            </div>
        );
    }

}

export default NotteName;