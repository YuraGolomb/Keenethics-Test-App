import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { browserHistory, Link } from 'react-router'

export default class App extends Component {
	constructor(props){
		super(props);
		this.state = this.getMeteorData();
		this.logout = this.logout.bind(this);
	}

	getMeteorData() {
		return { isAuthenticated: Meteor.userId() !== null };
	}

	componentWillMount(){
		if (!this.state.isAuthenticated) {
			browserHistory.push('/login');
		}
	}

	componentDidUpdate(prevProps, prevState){
		if (!this.state.isAuthenticated) {
			browserHistory.push('/login');
		}
	}

	logout(e) {
		e.preventDefault();
		Meteor.logout;
		browserHistory.push('/login');
	}

	render() {

		var ContentEl = ( 
			<div>
				{this.props.children}
			</div>
		)

		return(
			<div id='application'> 
			<div className="top-panel">
			<a href="#" className="nav-button" id="logout" onClick={this.logout}>Logout</a>
			<Link className="nav-button" to="/profile">Profile</Link>
			<Link className="nav-button" to="">Chat</Link>
			</div>
				{ContentEl}
			</div>
		)
	}
}