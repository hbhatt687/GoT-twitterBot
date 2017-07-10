console.log('the bot is starting');

var Twit = require('twit');
var config = new require('./config');

var T = new Twit(config);