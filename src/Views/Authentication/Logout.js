import React from "react";
import { Spinner } from 'reactstrap';
import AuthService from 'Services/Auth/AuthService';
import { RoutesPath } from 'Constants/Routes';

class Logout extends React.Component
{
    render() {
        return (
            <div className="logout-wrapper">
                <h1 align="center" className="pt-4">
                    <Spinner align="center" type="grow" color="primary" />
                </h1>
            </div>
        )
    }

    componentDidMount()
    {
        let auth = new AuthService();
        auth.logout();

        this.props.history.push(RoutesPath.login);
    }
}

export default Logout;