import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'

import './index.scss';
import 'font-awesome/css/font-awesome.min.css'
import App from './containers/App';

const history = createHistory();

ReactDOM.render(
    <BrowserRouter history={history}>
        <Switch>
            <Route path="/" name="App" component={App} />
        </Switch>
    </BrowserRouter>, document.getElementById('root')
);