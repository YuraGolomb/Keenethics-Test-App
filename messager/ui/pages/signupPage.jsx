import React, { Component, PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'
import { Accounts } from 'meteor/accounts-base'

export default class SignupPage extends Component {
	constructor(props){
		super(props);
		this.state = { 
			error: ''
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleSubmit(e){
		e.preventDefault();

		var username = document.getElementById("signup-name").value;
		var email = document.getElementById("signup-email").value;
		var password = document.getElementById("signup-password").value;
		var channel = 'default';

		Accounts.createUser({ email, username, password }, (err) => {
			if(err){
				this.setState({
					error: err.reason
				});
			} else {
				browserHistory.push('/login');
			}
		});
	}

	render() {
		const error = this.state.error;

		return (
			<div className="signupPage-wrapper">
				{ error.length > 0 ?
                <div className="">{error}</div>
                :''}
                <form  id="login-form"
                    className=""
                    onSubmit={this.handleSubmit}>
                <div className="">
                  <input type="text" id="signup-name"
                        className="" placeholder="name"/>
                </div>
                <div className="">
                  <input type="email" id="signup-email"
                        className="" placeholder="email"/>
                </div>
                <div className="">
                  <input type="password" id="signup-password"
                        className=""
                        placeholder="password"/>
                </div>
                <div className="">
                  <input type="submit" id="login-button"
                        className=""
                        value="Sign Up" />
                </div>
                <div className="">
                  <p className="">
                    Already have an account? Login <Link to="/login">here</Link>
                  </p>
                </div>
              </form>
			</div>
		)
	}
}