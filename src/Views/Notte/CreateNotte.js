import React from 'react';
import Container from 'Views/Container';
import NotteForm from 'Components/Notte/NotteForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

class CreateNotte extends React.Component {

    render() {
        return (
            <Container>
                <h1>
                    <FontAwesomeIcon icon={faPlusCircle} className="mr-3" />Add data
                </h1>
                <NotteForm />
            </Container>
        );
    }

}

export default CreateNotte;
