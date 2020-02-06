import React from 'react';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom'
import {PrivateRoutes, Routes} from 'Constants/Routes';
import PrivateRoute from 'Components/Routing/PrivateRoute';
import History from "Utils/History";

import 'Assets/sass/app.scss';

class App extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return (
            <Router history={History}>
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
            </Router>
        );
    }
}

export default App;
