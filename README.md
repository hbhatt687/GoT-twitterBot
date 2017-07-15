# GoT-twitterBot
This is a twitter bot that posts quotes from a Song of Ice and Fire series. The bot scans the wikiquotes web page for Game of Thrones and selects one quote every 24 hours to post on twitter. 

**The current verison of the bot is live at: https://twitter.com/GoT_fanBot**
## Getting Started
If you wanted to run this on your local system, these steps will be of use to you. Download all of the files in the repo and follow these steps.
### Prerequisites
You will need a Twitter account and Twitter's authentication keys to place in your `config.js` file.

You will need to have [NodeJS](https://nodejs.org/en/) installed in order to run this bot.
Once you have NodeJS, type the command `npm init` to create your `package.json` file. 


You will need the following dependencies: 

Installing Cheerio
```
npm install cheerio --save
```
Installing Request
```
npm install request --save
```
Installing Twit
```
npm install twit --save
```

## Running the bot
To run the bot simply type
```
node bot.js
```
## Deployment
Deployed the bot v1.0 using Heroku. 

The bot is live [@GoT_fanBot](https://twitter.com/GoT_fanBot). 

## Built With
* [NodeJS](https://nodejs.org/en/) - The Javascript runtime environment used.
* [Cheerio](https://cheerio.js.org) - Used to scrap the website for quotes.
* [Request](https://www.npmjs.com/package/request) - Used to establish a connection with the website for quotes.
* [Twit](https://www.npmjs.com/package/twit) - Twitter API used for posting tweets.

## Authors
* **Harsh Bhatt** 

## Acknowledgments 
* Thanks to Daniel Shiffman's [The Coding Train](https://www.youtube.com/user/shiffman) NodeJS tutorials for helping me get started on how to make a Twitter bot.
