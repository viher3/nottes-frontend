import React from 'react';
import { Switch, Route } from 'react-router-dom'
import {PrivateRoutes, Routes} from 'Constants/Routes';
import PrivateRoute from 'Components/Routing/PrivateRoute';

import 'Assets/sass/app.scss';

function App() {

    return (
        <Switch>
            {Routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                />
            ))}
            {PrivateRoutes.map((route, index) => (
                <PrivateRoute
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
                />
            ))}
        </Switch>
    );
}

export default App;
