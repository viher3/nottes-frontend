import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Editor from 'Components/Editor/CustomToolbarEditor';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

class NotteForm extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Form>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" placeholder="Enter a title" />
                </FormGroup>

                <FormGroup>
                    <Label for="Content">Content</Label>
                    <Editor />
                </FormGroup>
                <FormGroup>
                    <Label for="tags">Tags</Label>
                    <Input type="text" name="tags" id="tags" placeholder="Enter tags separated by comma ..." />
                </FormGroup>
                <FormGroup>
                    TODO: encrypt component
                </FormGroup>
                <Button>
                    <FontAwesomeIcon icon={faSave} className="mr-2" />Save
                </Button>

            </Form>
        );
    }

}

export default NotteForm;
