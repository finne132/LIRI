"use strict";

// require statements: dotenv, the keys.js file, twitter, node-spotify-api, request, fs
require("dotenv").config();
var keys = require('./keys.js');
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
var request = require("request");
var fs = require('fs');

// get the API key values from the .env file via keys.js
var spotifyKeys = new Spotify(keys.spotify);
var twitterKeys = new Twitter(keys.twitter);

// print the key values to the console
// ***WARNING: REMOVE THIS AS SOON AS POSSIBLE*** 
console.log("spotifyKeys is " + JSON.stringify(spotifyKeys));
console.log("twitterKeys is " + JSON.stringify(twitterKeys));

// Part 0: we need a switch structure to read in command line arguments and execute the associated functions

// pass in the 3rd argument from the command line to the switcher function
let userCommand = process.argv[2];

function switcher(){
	switch(userCommand){

        // if the user enters my-tweets, run getTweets()
        case 'my-tweets':
        console.log("my tweets entered")
		getTwitter();
		break;

        // if the user enters spotify-this-song, run getSpotify()
		case 'spotify-this-song':
		getSpotify();
		break;

        // if the user enters movie-this, run getMovie()
		case 'movie-this':
		getMovie();
		break;

        // if the user enters do-what-it-says, run getSays()
		case 'do-what-it-says':
		getSays();
		break;
		
	}
};

// Part 1: command: node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.

function getTwitter(){
    //parameters that will be passed with the "get" call below
	var parameters = {
		screen_name: 'FerdaAMZNPrizes', // your twitter screen name
		count: 20 // how many tweets you want returned
    };

    // make the call using our twitterKey object and the APIs preferred syntax
    // pass in the parameters to make sure we only grab 20 tweets from the specified screen name
    twitterKeys.get('statuses/user_timeline', parameters, function(error, tweets, response){
		if (!error) {
	        for (let i=0; i<tweets.length; i++) {
	            var returnedData = ('Tweet Number: ' + (i+1) + '\n' + tweets[i].created_at + '\n' + tweets[i].text + '\n');
	            console.log(returnedData);
	            console.log("-------------------------");
	        }
        }
        else {
            console.log("THERE WAS AN ERROR PLEASE TRY AGAIN")
        };
	});
} 

function getSpotify(){

}

function getMovie(){

}

function getSays(){

}

// activate the switcher
switcher();