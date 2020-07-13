import React from "react"
import {AvField} from "availity-reactstrap-validation";
import {Label} from "reactstrap";

class EncryptionInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEncrypted : false,
            password: ''
        }
    }

    render() {
        return (
            <div className="mt-4">
                <div>
                    <Label check>
                        <AvField type="checkbox"
                                 name="isEncrypted"
                                 id="isEncrypted"
                                 value={this.state.isEncrypted}
                                 onChange={(e) => this.handleChange(e) }
                        />
                        <span className="pl-4">Encrypt</span>
                    </Label>
                </div>
                { true === this.state.isEncrypted ? ( this.formView() ) : ('') }
            </div>
        );
    }

    formView() {
        return (
            <div className="mt-3 row">
                <div className="col-6">
                    <Label for="password">Password</Label>
                    <AvField type="password"
                             name="password"
                             id="password"
                             placeholder="Enter a password"
                             onChange={(e) => this.handleChange(e)}
                             value={this.state.password}
                             errorMessage="Required field"
                             validate={{
                                 required: {value: true}
                             }}
                    />
                </div>
                <div className="col-6">
                    <Label for="password2">Repeat your password</Label>
                    <AvField type="password"
                             name="password2"
                             id="password2"
                             placeholder="Repeat your password"
                             onChange={(e) => this.handleChange(e)}
                             value={this.state.password2}
                             validate={{
                                 required: {
                                     value: true,
                                     errorMessage: 'Required field'
                                 },
                                 match:{
                                     value:'password',
                                     errorMessage: 'Password does not match'
                                 }
                             }}
                    />
                </div>
            </div>
        )
    }

    handleChange(event) {
        let type = event.target.type
        let value = (type === 'checkbox') ? event.target.checked : event.target.value

        this.setState({[event.target.name]: value});
    }
}

export default EncryptionInput
