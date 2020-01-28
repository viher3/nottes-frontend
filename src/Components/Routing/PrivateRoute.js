import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import AuthHelper from 'Helpers/AuthHelper';

const PrivateRoute = ({ component: Component, ...rest }) => (

    <Route {...rest} render={(props) => (
        (null !== AuthHelper.getToken())
            ? <Component {...props} />
            : <Redirect to='/login' />
    )} />
);

export default PrivateRoute;