import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Accounts } from 'meteor/accounts-base';
import { browserHistory, Link } from 'react-router';

class Profile extends Component{
	constructor(props) {
		super(props);

		this.state = {
			notification: ''
		}
		this.handleUsernameSubmit = this.handleUsernameSubmit.bind(this);
		this.handleEmailSubmit = this.handleEmailSubmit.bind(this);
		this.handlePasswordSubmit = this.handlePasswordSubmit.bind(this);

	}

	handleEmailSubmit(e){
		e.preventDefault();

		const email = document.getElementById('change-email').value;

		Meteor.call('user.changeEmail', email, (err, res) => {
			if(res){
				this.setState({
					notification:"Email changed successfully"
				})
			}
			else{
				this.setState({
					notification:"Email didn't changed"
				})
			}
		})
		document.getElementById('change-email').value = "";
	}

	handleUsernameSubmit(e){
		e.preventDefault();

		const username = document.getElementById('change-username').value;

		Meteor.call('user.changeUsername', username, (err, res) => {
			if(res){
				this.setState({
					notification:"Username changed successfully"
				})
			}
			else{
				this.setState({
					notification:"Username didn't changed"
				})
			}
		})
		document.getElementById('change-username').value = "";
		
	}

	handlePasswordSubmit(e){
		e.preventDefault();

		const oldPassword = document.getElementById('old-password').value;
		const newPassword = document.getElementById('new-password').value;

		Meteor.call('user.changePassword', oldPassword, newPassword, (err, res) => {
			if(res){
				this.setState({
					notification:"Password changed successfully"
				})
			}
			else{
				this.setState({
					notification:"Password didn't changed"
				})
			}
		})
		document.getElementById('new-password').value = "";
		document.getElementById('old-password').value = "";

		
	}

	render() {
		const notification = this.state.notification;

		return (
			<div className="profile-wrapper">
				<p> Welcome {this.props.user != undefined ? this.props.user.username : ""} </p>

				{notification.length > 0 ?
					<div className="notification">{notification}</div>
					: ""}
			 
                    <div className="form">
                    	<form  id="change-username-form"
                    		onSubmit={this.handleUsernameSubmit}>

	                		<label htmlFor="change-username">
	                			Change username:
	                		</label>
	                  		<input type="text"
	                        	id="change-username"
	                        	placeholder="new username"/>
	                        <a href="#" className="submit-button" id="logout" onClick={this.handleUsernameSubmit}>Enter</a>
                        </form>
                    </div>

                	<div className="form">
                		<form  id="change-email-form"
                    		onSubmit={this.handleEmailSubmit}>
	                		<p>
	                			Old email: '{(this.props.user != undefined && this.props.user.emails[0]) 
	                							? this.props.user.emails[0].address : ""}'
	                		</p>
	                		<label htmlFor="change-email">
	                			New email:
	                		</label>
	                  		<input type="email"
	                        	id="change-email"
	                        	placeholder="new email"/>
	                        <a href="#" className="submit-button" id="logout" onClick={this.handleEmailSubmit}>Enter</a>
                        </form>
                	</div>

	                <div className="form">
	                	<form  id="change-password-form"
                    		onSubmit={this.handlePasswordSubmit}>
		                	<p>Change password</p>
		                	<p>
			                	<label htmlFor="old-password">
		                			Old password:
		                		</label>
			                 	<input type="password"
			                        id="old-password"
			                        className=""
			                        placeholder="old password"/>
	                        </p>
	                        <p>
		                        <label htmlFor="new-password">
		            				New password:
		                		</label>
			                    <input type="password"
			                        id="new-password"
			                        className=""
			                        placeholder="new password"/>
			                    <a href="#" className="submit-button" id="logout" onClick={this.handlePasswordSubmit}>Enter</a>
	                        </p>
                        </form>
	                </div>
      		</div>
		)
	}
}

export default createContainer (({ prarams }) => {
	const userDataHandle = Meteor.subscribe('userData');
	const user = Meteor.user();

	return {
		user
	}
}, Profile)

