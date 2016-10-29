//import { Meteor } from 'meteor/meteor';
//import { render } from 'react-dom';
//import { renderRoutes } from '../imports/startup/client/routes.jsx';
import { Messages , Countries} from '/api/lists/lists.js';

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

   		return Messages.find();
	});

	Meteor.publish('userData', function() {
		if(!this.userId) return null;

		return Meteor.users.find(this.userId, {fields: { channel: 1, } } );
	});
});

// 	//render(renderRoutes(), document.getElementById('app'));
	

// });
