import React from 'react';
import {Button, Form, FormGroup, Label, Input} from 'reactstrap';
import Editor from 'Components/Editor/CustomToolbarEditor';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import { AvForm, AvField } from 'availity-reactstrap-validation';

class NotteForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isValid: false,
            title: '',
            tags: '',
            content: '',
            formErrors: {
                title: '',
                tags: '',
                content: ''
            },
            submitted: false
        };
    }

    render() {
        return (
            <AvForm onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <AvField type="text"
                           name="title"
                           id="title"
                           placeholder="Enter a title"
                           onChange={(e) => this.handleChange(e)}
                           value={this.state.title}
                           errorMessage="Required field"
                           validate={{
                               required: {value: true}
                           }}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="Content">Content</Label>
                    <Editor/>
                </FormGroup>
                <FormGroup>
                    <Label for="tags">Tags</Label>
                    <AvField type="text"
                           name="tags"
                           id="tags"
                           placeholder="Enter tags separated by comma ..."
                           onChange={(e) => this.handleChange(e)}
                           value={this.state.tags}
                    />
                </FormGroup>
                <FormGroup>
                    TODO: encrypt component
                </FormGroup>
                <Button>
                    <FontAwesomeIcon icon={faSave} className="mr-2"/>Save
                </Button>
            </AvForm>
        );
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event, errors, values) {
        console.log('submit');
        console.log(errors);
        console.log(values);
    }

}

export default NotteForm;
