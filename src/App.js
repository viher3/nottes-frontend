import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'

import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Routes } from 'Constants/Routes';

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
        </Switch>
    );
}

export default App;
