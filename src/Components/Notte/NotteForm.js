import React from 'react';
import {Button, FormGroup, Label} from 'reactstrap';
import Editor from 'Components/Editor/CustomToolbarEditor';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave} from '@fortawesome/free-solid-svg-icons';
import {AvForm, AvField} from 'availity-reactstrap-validation';
import axios from 'Services/Http/Axios'
import notification from 'Services/Common/NotificationService'
import EncryptionInput from 'Components/Notte/EncryptionInput'

import {RoutesPath} from "Constants/Routes"

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
        }

        this.handleSubmit = this.handleSubmit.bind(this);
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
                    <Editor onEditorChange={this.onEditorChange}/>
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
                    <EncryptionInput />
                </FormGroup>
                <Button>
                    <FontAwesomeIcon icon={faSave} className="mr-2"/>Save
                </Button>
            </AvForm>
        );
    }

    onEditorChange(editorContent) {
        localStorage.setItem('content', editorContent);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
        localStorage.setItem(event.target.name, event.target.value);
    }

    handleSubmit(event, errors, values) {
        if (errors.length === 0) {

            let formData = {
                name: values.title,
                tags: values.tags,
                content: localStorage.getItem('content')
            }

            axios.post('/api/notte', formData).then((response) => {
                if (response.status === 200) {
                    notification.add('success', null, 'Notte created successfully!')
                    this.props.history.push(RoutesPath.dashboard)
                }
            }).catch((error) => {
                notification.catchServerErrors(error)
            })
        }
    }

}

export default NotteForm;
