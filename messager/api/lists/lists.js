import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');
export const Countries = new Mongo.Collection('countries');

Messages.schema = new SimpleSchema({
	text: {type:String},
	createdAt: {type:Date},
	authorId: {type: String, regEx: SimpleSchema.RegEx.Id},
	authorName: {type: String}
})

Meteor.methods({
	'messages.insert' : (message) => {
		check(message, String);

		Messages.insert({
			text: message, 
			createdAt: new Date(), 
			channel: Meteor.user().channel 
		});
	},
	'user.changeChannel' : (channel) => {

		Meteor.users.update(Meteor.userId(), { '$set': { channel } });
	}
})

