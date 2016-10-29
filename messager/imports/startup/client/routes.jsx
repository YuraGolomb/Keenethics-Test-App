import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '/ui/containers/App.jsx';
import Chat from '/ui/components/chat.jsx';
import LoginPage from '/ui/pages/loginPage.jsx';
import SignupPage from '/ui/pages/signupPage.jsx';


Meteor.startup ( () => {
	
	render(
		<Router history={browserHistory}>
			<Route path="login" component={LoginPage}/>
			<Route path="signup" component={SignupPage}/>
			<Route path="/" component={App}>
				<IndexRoute component={Chat}/>
			</Route>
		</Router>,
		document.getElementById( 'react-root' )
	);
});
