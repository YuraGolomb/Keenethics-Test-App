import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { createContainer } from 'meteor/react-meteor-data'

//import '/loginPage.scss';
//import "{}/ui/pages/loginPage.import.scss"

export default class LoginPage extends Component {
	constructor(props){
		super(props);
		this.state = {
			error: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();
		var email = document.getElementById('login-email').value;
		var password = document.getElementById('login-password').value;
		Meteor.loginWithPassword(email, password, (err) => {
			if(err){
				this.setState({
					error: err.reason
				})
			} else {
				browserHistory.push('/');
			}
		});
	}

	render() {
		const error = this.state.error;
		return (
			<div className="loginPage-container">
				{ error.length > 0 ?
                <div className="alert">{error}</div>
                :''}

                <form  id="login-form"
                    className="form "
                    onSubmit={this.handleSubmit}>
                <div className="">
                	<p className="login">Log In</p>
                  <input type="email"
                        id="login-email"
                        className="login-input"
                        placeholder="email"/>
                </div>
                <div className="">
                  <input type="password"
                        id="login-password"
                        className="login-input"
                        placeholder="password"/>
                </div>
                <div className="">
                    <a href="#" className="button" onClick={this.handleSubmit}> Log In </a>
                </div>
                <div className="">
                  <p className="text-right">
                    Don't have an account? Register <Link to="/signup">here</Link>
                  </p>
                </div>
              </form>
			</div>

		)
	}
}