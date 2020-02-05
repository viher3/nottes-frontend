import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import ReactNotification from 'react-notifications-component'
import { Provider } from 'react-redux';
import Store from 'Store/Store';
import History from 'Utils/History';

ReactDOM.render(
    <BrowserRouter history={History}>
        <Provider store={Store}>
            <ReactNotification />
            <App />
        </Provider>
    </BrowserRouter>,
    document.getElementById('wrapper')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
