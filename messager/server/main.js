import { Messages , Countries} from '/api/lists/lists.js';
import '/api/server/methods.js'

 Meteor.startup(() => {

	Accounts.onCreateUser( (options, user) => {
	        user.channel = 'default';

	    if (options.profile)
	        user.profile = options.profile;

	    return user;
	});

	Meteor.publish('countries', () => {

  		return Countries.find();
	});

	Meteor.publish('messages', (country) => {

   		return Messages.find({}, { sort:{ createdAt: 1 } } );
	});

	Meteor.publish('userData', function() {
		if(!this.userId) return null;

		return Meteor.users.find(this.userId, {fields: { channel: 1, } } );
	});
});
