import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route } from 'react-router';

import { createHistory } from 'history';

// Import components
import NotFound from './components/NotFound';
import StorePicker from './components/StorePicker';
import App from './components/App';


/**
	Routes
*/
var routes = (
	<Router history={createHistory()}>
		<Route path="/" component={StorePicker}></Route>
		<Route path="/store/:storeId" component={App}></Route>
		<Route path="*" component={NotFound}></Route>
	</Router>
);

ReactDOM.render(routes, document.querySelector('#main'));
