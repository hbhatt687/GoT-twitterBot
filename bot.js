
//
// This bot tweets quotes from a Song of Ice and Fire
// It scraps quotes from the wikipedia page that contains quotes from the series
// The bot also replies to people that follow it
//
// @author Harsh Bhatt

console.log('the bot is starting');

//
// These are the required libraries and folders needed to run the bot
//
var fs = require('fs');
var Twit = require('twit');
var config = new require('./config');
var T = new Twit(config);
var exec = require('child_process').exec;


// QUOTE code

// post a tweet once a day
tweetIt();
setInterval(tweetIt, 1000*20);

function tweetIt() {
	//
	// This will start looking for quotes to post
	// It will put the quote in a JSON file
	//
	var cmd = 'node server.js';
	exec(cmd, server);
	setTimeout(tweetIt, 1000*10);
	function server() {
	console.log('server is scrapping');
	}

	var quoteFile = require('./output.json');

	// Read from JSON file for the quote
	var params = {
		status: quoteFile.quote
	}

	//  tweet a quote
	T.post('statuses/update', params, getData);

	function getData(err, data, response) {
		if (err) {
			console.log("Something went wrong!");
		} else {
			console.log("Tweeted something!");
		}
	}
}

// FOllOW code

// Setting up a user stream
var stream = T.stream('user');

// Anytime someone follows the bot
stream.on('follow', followed);

function followed(eventMsg) {
	console.log('follow event');
	var name = eventMsg.source.name;
	var screenName = eventMsg.source.screen_name;
	tweetReply('@' + screenName + ' I see that you are a fan of the series!');
}

function tweetReply(txt) {
	var params = {
		status: txt
	}

	//  tweet at the follower
	T.post('statuses/update', params, getData);

	function getData(err, data, response) {
		if (err) {
			console.log("Something went wrong! The reply did not work.");
		} else {
			console.log("It worked! You replied to someone.");
		}
	}
}