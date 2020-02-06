import React from 'react';
import Container from 'Views/Container';
import NotteForm from 'Components/Notte/NotteForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Card, CardHeader, CardBody } from 'reactstrap';

class CreateNotte extends React.Component {

    render() {
        return (
            <Container>
                <Card>
                    <CardHeader>
                        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />Add data
                    </CardHeader>
                    <CardBody>
                        <NotteForm />
                    </CardBody>
                </Card>
            </Container>
        );
    }

}

export default CreateNotte;
