
//
// This bot tweets quotes from a Song of Ice and Fire
// It scraps quotes from the wikipedia page that contains quotes from the series
// The bot also replies to people that follow it
//
// @author Harsh Bhatt

//
// These are the required libraries and folders needed to run the bot
//
var Twit = require('twit');
var config = new require('./config');
var T = new Twit(config);
var fs = require('fs');
var request = require("request");
var cheerio = require("cheerio");
var url = "https://en.wikiquote.org/wiki/A_Song_of_Ice_and_Fire";
var quoteIndex = 8;


// QUOTE code

// post a tweet once a day
setInterval(tweetIt, 1000*60*60*24);

function tweetIt() {
	//
	// This will start looking for quotes to post
	// It will increment the quoteIndex by 2 because
	// that is where the relavent quotes are located on the website.
	//
	quoteIndex = quoteIndex + 2;
	server(quoteIndex);

	//
	// Read the quote from the JSON file and post the quote.
	///
	fs.readFile('./output.json', function(err, data) {
		if (err) throw err;

		// Read from JSON file for the quote
		var quote = JSON.parse(data);

		var params = {
			status: quote.quote
		}

		//  tweet a quote
		T.post('statuses/update', params, getData);

		function getData(err, data, response) {
			if (err) {
				console.log("Something went wrong!: " + err);
			} else {
				console.log("Tweeted something!");
			}
		}
	})
}

function server(quoteNumber) {
	//
	// This makes a connection with the wikiquotes website and
	// recieves a quote based on quoteNumber parameter.
	//
	request(url, function (error, response, body) {
	  if (!error) {
	    var $ = cheerio.load(body);
	    
	    var quote;
	    var json = {quote : ""};

	    $( "div.mw-parser-output ul" ).filter(function( INDEX ) {
		    if (INDEX % 2 == 0 && (INDEX == quoteNumber)) {
		      quote = $( this ).text();   
		      json.quote = quote;
		     }
	    });
	  } else {
	    console.log("We’ve encountered an error: " + error);
	  }

	  //
	  // Write our quotes out to a JSON file.
	  //
	  fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){})
	});
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