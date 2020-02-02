import React from 'react';
import {Form, Input, Spinner, Button } from 'reactstrap';
import AuthHelper from 'Helpers/AuthHelper';
import AuthService from 'Services/Auth/AuthService';
import NotificationService from 'Services/Common/NotificationService';
import 'Assets/sass/authentication/login.scss';

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
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5">
                            <div className="card-body">
                                <h5 className="card-title text-center">Sign In</h5>
                                <Form className="form-signin">
                                    <div className="form-label-group">
                                        <Input type="text"
                                               name="user"
                                               id="inputEmail"
                                               className="form-control"
                                               placeholder="Username or email"
                                               value={this.state.user}
                                               onChange={this.handleInputChange}
                                               onKeyPress={this.handleInputKeyPress}
                                               autoFocus />
                                        <label htmlFor="inputEmail">Username or email</label>
                                    </div>
                                    <div className="form-label-group">
                                        <input type="password"
                                               name="password"
                                               id="inputPassword"
                                               className="form-control"
                                               placeholder="Password"
                                               value={this.state.password}
                                               onChange={this.handleInputChange}
                                               onKeyPress={this.handleInputKeyPress} />
                                        <label htmlFor="inputPassword">Password</label>
                                    </div>
                                    <div className="custom-control custom-checkbox mb-3">
                                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                        <label className="custom-control-label" htmlFor="customCheck1">Remember password</label>
                                    </div>
                                    <Button
                                        color="blue"
                                        className="btn btn-lg btn-primary btn-block text-uppercase"
                                        disabled={this.state.loading}
                                        onClick={this.submit}
                                        type="button">
                                        {this.state.loading ? (
                                            <Spinner size="sm" color="light"/>
                                        ) : (
                                            <span>Sign in</span>
                                        )}
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    </div>
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

                let error = 'No server response';

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
