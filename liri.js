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
let userFunction = process.argv[2];

var userParameters = process.argv[3];

// handler for multiple-word user paramaeters (song or movie names, etc)
// since userParameters starts with whatever is in the [3] position of the command line argument
// I am adding a loop here to take any and all arguments after position 3 and append them to 
// whatever was entered in position 3 using plus signs because that's what the spotify API uses 
for(let i=4; i<process.argv.length; i++){
	userParameters += `+${process.argv[i]}`;
}
// example input: this is the song name
// example output: this+is+the+song+name 

function switcher(){
	switch(userFunction){

        // if the user enters my-tweets, run getTweets()
        case 'my-tweets':
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
            // if error is true, log to the console that we ran into an error and instruct the user to try again
            console.log("THERE WAS AN ERROR PLEASE TRY AGAIN")
        };
	});
} 

function getSpotify(){
    // command: node liri.js spotify-this-song '<song name here>'
    // this will call to spotify and return the following information about the song: 
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
    // If no song is provided then your program will default to "The Sign" by Ace of Base.

}

function getMovie(){

}

function getSays(){

}

// activate the switcher
switcher();