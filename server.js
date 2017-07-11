
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

	// The URL to scrape from.
	 var url = 'https://www-eng-x.llnl.gov/documents/tests/txt.html';

	// The structure of the request call
	// The first parameter is the URL
	// The callback function takes 3 parameters, an error, response stat
    // us code and the html
    request(url, function(error, response, html){
    	// First check to see that no errors occurred when making the
    	// request
    	if (!error) {
    		// Next, utilize the cheerio library on the returned
    		// html which will essentially give jQuery functionality
    		var $ = cheerio.load('html');

    		// Finally, define the variables to capture
    		var quote;
    		var json = {quote : ""};

    		// Use unique div class as starting point
    		$('TITLE').filter(function(){
    			// Store data into a variable to see what is going on
    			var data = $(this);

    			// In examining the DOM, the quote rests within the first li
    			// element of this div tag.

    			// using jQuery, navigate and get the text by writing the
    			// following code
    			quote = data.text();

    			// Once you have the quote, store it in a JSON object
    			json.quote = quote;
    		})
    	}
  fs.writeFile('output.json', JSON.stringify(json, null, 4), function (err) {

	console.log('File successfully written! - Check your project directory ' +
		'for the output.json file');
	})

	});

