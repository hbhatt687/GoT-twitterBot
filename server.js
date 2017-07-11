var request = require("request"),
  cheerio = require("cheerio"),
  url = "https://en.wikiquote.org/wiki/A_Song_of_Ice_and_Fire";
  
request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body),
      quote = $("#mw-content-text div ul li").text();
      
    console.log("The quote: " + quote);
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});