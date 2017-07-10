console.log('the bot is starting');

var Twit = require('twit');
var config = new require('./config');

var T = new Twit(config);

var params = {
	status: 'hello world!'
}

//
//  tweet 'hello world!'
//
T.post('statuses/update', params, getData);

function getData(err, data, response) {
	if (err) {
		console.log("Something went wrong!");
	} else {
		console.log("It worked!");
	}
}