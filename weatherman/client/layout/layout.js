
Template.layout.helpers({
	curweather: function () {
		var city = Session.get('city')
			Meteor.call('getWeather', city, function(err, results){
				console.log(results.content)
			Session.set('weather', JSON.parse(results.content).weather[0].description)

		})
	return (Session.get('weather') + ' in ' + city).toUpperCase()
	}
});

Template.layout.events({
	'change .cities': function (evt, tmp) {
		Session.set('city', tmp.find('.cities').value) 
	}
});