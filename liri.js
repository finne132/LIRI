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

// Part 1: command: node liri.js my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.

function getTweets(){
    //parameters for twitter function.
	var parameters = {
		screen_name: 'FerdaAMZNPrizes',
		count: 20
	};
} 
