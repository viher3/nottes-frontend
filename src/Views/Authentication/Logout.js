import React from "react";
import { Spinner } from 'reactstrap';
import AuthService from 'Services/Auth/AuthService';

class Logout extends React.Component
{
    render() {
        return (
            <div className="logout-wrapper">

                <h1 align="center" className="pt-4">
                    <Spinner align="center" type="grow" color="primary" />
                    <br />
                    <div className="pt-3">Desconectando</div>
                </h1>
            </div>
        )
    }

    componentDidMount()
    {
        let auth = new AuthService();
        auth.logout();

        this.props.history.push('/login');
    }
}

export default Logout;