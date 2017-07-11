  
  var fs = require('fs');

  var request = require("request"),
  cheerio = require("cheerio"),
  url = "https://en.wikiquote.org/wiki/A_Song_of_Ice_and_Fire";
  
request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body);

    var INDEX = 4;
    
    var quote;
    var json = {quote : ""};

    $( "div.mw-parser-output ul" ).each(function( INDEX ) {
    
    if (INDEX % 2 == 0 && (INDEX > 2) && (INDEX < 360)) {
      quote = $( this ).text();   
       }

       json.quote = quote;

    });


  } else {
    console.log("We’ve encountered an error: " + error);
  }

  fs.writeFile('output.json', JSON.stringify(json, null, 4).replace(/\\n/g, " "), function(err){

    console.log('File successfully written! - Check your project directory for the output.json file');

  })

});




