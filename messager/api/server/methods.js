import { Accounts } from 'meteor/accounts-base'
if(Meteor.isServer)
Meteor.methods({
	'user.changeChannel' : (channel) => {

		Meteor.users.update(Meteor.userId(), { '$set': { channel } });
	},
	'user.changeEmail' : (email) => {
		
		const id = Meteor.userId();
		if (id){
			const user = Meteor.user();			
			if (user.emails[0]) 
				Accounts.removeEmail(id, user.emails[0].address)
			Accounts.addEmail(id, email);
			return true;
		}
		else
			return false;

	},
	'user.changePassword' : (oldPass, newPass) => {
		const id = Meteor.userId();


		if(id){
			var user = Meteor.user();
			var result = false;
			var digest = Package.sha.SHA256(oldPass);
			var password = {digest: digest, algorithm: 'sha-256'};
			var logout = {
				default: false
			};
			var res = Accounts._checkPassword(user, password);

			result = (res.error == null);

			if(result){
				console.log('here')
				Accounts.setPassword(id, newPass, {logout: false})
			}
			return result
		}
		else
			return false

	},
	'user.changeUsername' : (username) => {
		const id = Meteor.userId();
		if(id){
			Accounts.setUsername(id, username)
			return true;
		}
		else
			return false;
	}
})