import React from 'react';
import Container from 'Views/Container';
import NotteForm from 'Components/Notte/NotteForm';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { Card, CardHeader, CardBody } from 'reactstrap';

class AddData extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Card>
                    <CardHeader>
                        <FontAwesomeIcon icon={faPlusCircle} className="mr-2" />{this.props.title}
                    </CardHeader>
                    <CardBody>
                        <NotteForm type={this.props.type} />
                    </CardBody>
                </Card>
            </Container>
        );
    }

}

export default AddData;
