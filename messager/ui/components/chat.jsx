import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Messages } from '/api/lists/lists.js';
import moment from 'moment';
import { browserHistory, Link } from 'react-router'

import LocationChanel from '/ui/components/locationChanel.jsx'

class Chat extends Component {
	constructor(props){
		super(props);
	}

	handleNewMsgSubmit (event) {
		event.preventDefault();

		const text = ReactDOM.findDOMNode(this.refs.msgInput).value.trim();

		Meteor.call('messages.insert', text, this.props.user.username);

		ReactDOM.findDOMNode(this.refs.msgInput).value = "";
	} 

	render() {

		var msgs = this.props.messages.map( (msg) => {
			var date = new Date(msg.createdAt).toDateString();

			return (
				<div className="message" key={msg._id}> 
					<div className="message-author">{msg.authorName}:</div>
					<div className="message-text">{msg.text}</div>
					<div className="message-date">
						<div className="message-date-month">{ moment(msg.createdAt).format('DD')} { moment(msg.createdAt).format('MMM') }</div>
						<div className="message-date-time">{ moment(msg.createdAt).format('HH:mm:ss') }</div>
					</div>
				</div>
			)
		})

		return(
			<div className="chat-wrapper">
				<div className="location-channel">
				<p>Select a channel</p>
					<LocationChanel />
				</div>
				<p>Last messages:</p>
				<div className="messages-container">					
					{msgs}
				</div>

				<div className="message-input-container">

				<form className="new-message" id="new-message" onSubmit={this.handleNewMsgSubmit.bind(this)}>
					<span>New message</span>
					<textarea className="input-message" form="new-message" ref="msgInput" placeholder="New Message..."/> 
					<a href="#" className="nav-button" id="logout" onClick={this.handleNewMsgSubmit.bind(this)}>Enter</a>
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
	var messages = [];
	if(user)
		messages= Messages.find({ channel: user.channel }).fetch();

	return {
		messages,
		user
	}
}, Chat)
