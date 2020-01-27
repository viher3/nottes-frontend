import React from 'react';
import { Switch, Route } from 'react-router-dom'
import { Routes } from 'Constants/Routes';
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
        </Switch>
    );
}

export default App;
