import React from 'react';
import {Form, FormGroup, Input, Alert, Spinner} from 'reactstrap';
import AuthHelper from 'Helpers/AuthHelper';
import AuthService from 'Services/Auth/AuthService';
import NotificationService from 'Services/Common/NotificationService';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            form: {
                user: '',
                password: ''
            },
            loading: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    render() {
        return (
            <div className="middle-box text-center loginscreen">
                <div className="login-wrapper">
                    <h2>Nottes</h2>

                    <Form className="m-t">
                        <FormGroup>
                            <Input type="text" name="user" value={this.state.user}
                                   onChange={this.handleInputChange}
                                   onKeyPress={this.handleInputKeyPress}
                                   className="form-control" placeholder="User or email" autoFocus/>
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" value={this.state.password}
                                   onChange={this.handleInputChange}
                                   onKeyPress={this.handleInputKeyPress}
                                   className="form-control" placeholder="Password"/>
                        </FormGroup>
                        <button disabled={this.state.loading} type="button" onClick={this.submit}
                                className="btn btn-primary block full-width m-b">
                            {this.state.loading ? (
                                <Spinner size="sm" color="light"/>
                            ) : (
                                <span>Sign in</span>
                            )}
                        </button>
                        <a href="#">
                            <small>Forgot your password?</small>
                        </a>
                    </Form>
                </div>
            </div>
        );
    }

    /**
     * Input keypress event handler
     * @param event
     */
    handleInputKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.submit();
        }
    }

    /**
     * Update status when input value changes
     * @param event
     */
    handleInputChange = (event) => {

        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState(prevState => ({
            form: {
                ...prevState.form,
                [name]: value
            }
        }));
    }

    /**
     * Form validation
     * @private
     */
    _validate = () => {

        let isValid = true;

        if (!this.state.form.user.length || !this.state.form.password.length) {
            NotificationService.add('danger', 'Error', 'All fields are required');
            isValid = false;
        }

        return isValid;
    }

    /**
     * Submit form
     */
    submit = async () => {

        if (this._validate()) {

            this.setState({loading: true});

            let auth = new AuthService();

            await auth.checkLogin(this.state.form.user, this.state.form.password).then((response) => {
                if (response.status === 'ok') {
                    this.props.history.push('/');
                }
            }).catch((response) => {

                let error = 'Error, no se ha obtenido respuesta.';

                if (response.error) {
                    error = response.error;
                }

                NotificationService.add('danger', 'Error', error);
                this.setState({loading: false});
            });
        }
    }

    componentDidMount() {
        if (AuthHelper.getToken()) {
            this.props.history.push('/');
        }
    }
}

export default Login;
