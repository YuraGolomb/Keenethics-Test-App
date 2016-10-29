import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Countries } from '/api/lists/lists.js';

class LocationChanel extends Component{
	constructor(props) {
		super(props);
	}

	handleLocationChange(event){
		Meteor.call('user.changeChannel', event.target.value);
	}

	render() {
		var options = this.props.countries.map( (country) => {
			return( <option key={country._id} value={country.name}>{country.name}</option> )
		})

		return(
			<div className="location-container">
				<select className="location-select" onChange={this.handleLocationChange}>
					<option disabled>Select a channel</option>
					{options}
				</select>
			</div>
		)
	}
}

export default createContainer (({ prarams }) => {
	const countriesHandle = Meteor.subscribe('countries');
	const countries = Countries.find({}, { sort: { name: 1} }).fetch();

	return {countries}
}, LocationChanel)
