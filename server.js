  
//
// This is the file that looks at wikiquote daily and grabs a quote
// for the GoT twitter bot to post.
//
// @author Harsh Bhatt

// The required packages and libraries.
var fs = require('fs');
var request = require("request"),
cheerio = require("cheerio"),
url = "https://en.wikiquote.org/wiki/A_Song_of_Ice_and_Fire";

var quoteIndex = require('./indexHandler');

//
// This makes a connection with the wikiequotes website and
// recieves a quote [based on index ? still need to figure this out..]
//
request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);
    
    var quote;
    var json = {quote : ""};

    $( "div.mw-parser-output ul" ).filter(function( INDEX ) {
    
    if (INDEX % 2 == 0 && (INDEX == quoteIndex.index)) {
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
  fs.writeFile('output.json', JSON.stringify(json, null, 4).replace(/\\n/g, " "), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

  })

  quoteIndex.index = quoteIndex.index + 2;

});




