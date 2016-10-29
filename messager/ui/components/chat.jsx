import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Messages } from '/api/lists/lists.js';

import LocationChanel from '/ui/components/locationChanel.jsx'

class Chat extends Component {
	constructor(props){
		super(props);
	}

	handleNewMsgSubmit (event) {
		event.preventDefault();

		const text = ReactDOM.findDOMNode(this.refs.msgInput).value.trim();

		Meteor.call('messages.insert', text);

		ReactDOM.findDOMNode(this.refs.msgInput).value = "";
	} 

	render() {

		var msgs = this.props.messages.map( (msg) => {
			var date = new Date(msg.createdAt).toDateString();

			return (
				<li key={msg._id}> {msg.text} - {date}</li>
			)
		})

		return(
			<div className="chat">

				<LocationChanel />
	
				<div className="messages-container">
					<ul className="messages">
						{msgs}
					</ul>
				</div>

				<div className="message-input-container">
				<form className="new-message" onSubmit={this.handleNewMsgSubmit.bind(this)}>
					<input type="text" ref="msgInput" placeholder="Text here"/>
				</form>
				
				</div>
	
			</div>
		)
	}
}

export default createContainer (({ prarams }) => {
	const messagesHandle = Meteor.subscribe('messages');
	const userDataHandle = Meteor.subscribe('userData');
	const user = Meteor.user();
	console.log(Meteor.user());
	var messages = [];
	if(user)
		messages= Messages.find({ channel: user.channel }).fetch();

	return {
		messages,
		user
	}
}, Chat)
