"use strict";

// require statements: dotenv, the keys.js file, twitter, node-spotify-api, request, fs
require("dotenv").config();
var keys = require('./keys.js');
const Twitter = require("twitter");
const Spotify = require("node-spotify-api");
var request = require("request");
var fs = require('fs');

// get the API key values from the .env file via keys.js
var spot = new Spotify(keys.spotify);
var twit = new Twitter(keys.twitter);

// Part 0: we need a switch structure to read in command line arguments and execute the associated functions

// pass in the 3rd argument from the command line to the switcher function
let userFunction = process.argv[2];

// pass in the 4th argument from the command line to the userParameters varaible. Anything after process.argv[2] 
// is considered a "user paramater" because the program doesn't use any other agrs and the user will likely
// use spaces to enter things like song and movie titles, so I have a for loop after this to take all 
// "user parameters" and append them to a single variable so we can pass it as a parameter to the various APIs 
var userParameters = process.argv[3];

// handler for multiple-word user paramaeters (song or movie names, etc)
// since userParameters starts with whatever is in the [3] position of the command line argument
// I am adding a loop here to take any and all arguments after position 3 and append them to 
// whatever was entered in position 3 using plus signs because that's what the APIs like 
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
    twit.get('statuses/user_timeline', parameters, function(error, tweets, response){
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

// PART 2: SPOTIFY
// command: node liri.js spotify-this-song '<song name here>'
    // this will call to spotify and return the following information about the song: 
        // Artist(s)
        // The song's name
        // A preview link of the song from Spotify
        // The album that the song is from
    // If no song is provided then the program will default to "The Sign" by Ace of Base
function getSpotify(){

	let searchTerm;
	if(userParameters === undefined){
        searchTerm = "The Sign Ace of Base";
        console.log("no search term was detected, searching for The Sign by Ace of Base");
	}else{
        // if there are search terms, use the userParameter that was formatted by our for loop
		searchTerm = userParameters;
	}
	//execute the spotify search using the searchTerm
	spot.search({type:'track', query:searchTerm}, function(error,data){
	    if(error){
	        console.log(`The call to Spotify encountered an error: ${error}`);
	        return;
	    }else{
            // if no error was encountered, print the return data: 
	  		console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
            console.log("Song Name: " + data.tracks.items[0].name);

            // check to see if the preview URL returned is null. Spotify returns null for preview URL 
            // when you query a song that is not available to stream in your region. If it is null, return 
            // some information to that effect. If it's not null, return the preview URL
            if (data.tracks.items[0].preview_url == null){
                console.log("Preview URL is not available - song is not available to stream in your region")
            }
            else{
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
            };
            console.log("Album Name: " + data.tracks.items[0].album.name);
            fs.appendFile("log.txt", `NEW SONG QUERIED:\nArtist Name: ${data.tracks.items[0].artists[0].name}\nSong Name: ${data.tracks.items[0].name}\nPreview URL: ${data.tracks.items[0].preview_url}\nAlbum Name:${data.tracks.items[0].album.name}\n------\n`,function(err) {
            });
	    }
	});
}
// STEP 3: command: node liri.js movie-this '<movie name here>'
// this should return... 
// * Title of the movie.
//    * Year the movie came out.
//    * IMDB Rating of the movie.
//    * Rotten Tomatoes Rating of the movie.
//    * Country where the movie was produced.
//    * Language of the movie.
//    * Plot of the movie.
//    * Actors in the movie.
function getMovie(){
    // this is exactly the same logic as the spotify function starts with
    // if there are search terms (aka userParameters), use them in the query
    // if there are not search terms, use a pre-defined default search
    let movieSearchTerm;
	if(userParameters === undefined){
		movieSearchTerm = "Mr. Nobody";
	}else{
		movieSearchTerm = userParameters;
	};
    // this is the queryURL that will be used to make the call - it holds the apikey, returns a "short" plot, type json, and 
    // the tomatoes flag attempts to return rottenTomatoes data although most of that is now deprecated as of may 2017 
    let queryURL = 'http://www.omdbapi.com/?t=' + movieSearchTerm +'&apikey=trilogy&y=&plot=short&tomatoes=true&r=json';
    request(queryURL, function(error, response, body){
	    if(!error && response.statusCode == 200){
	        console.log("Title: " + JSON.parse(body).Title);
	        console.log("Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Score: " + JSON.parse(body).Ratings[1].Value);
	        console.log("Country of Production: " + JSON.parse(body).Country);
	        console.log("Language: " + JSON.parse(body).Language);
	        console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            fs.appendFile("log.txt", `NEW MOVIE QUERIED:\nTitle: ${JSON.parse(body).Title}\nYear: ${JSON.parse(body).Year}\nIMDB Rating: ${JSON.parse(body).imdbRating}\nRotten Tomatoes Score: ${JSON.parse(body).Ratings[1].Value}\nCountry of Production: ${JSON.parse(body).Country}\nLanguage: ${JSON.parse(body).Language}\nPlot: ${JSON.parse(body).Plot}\nActors: ${JSON.parse(body).Actors}\n------\n`, function(err) {
            });
        }
    });
}

// STEP 4: command: node liri.js do-what-it-says
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt
// Feel free to change the text in that document to test out the feature for other commands.
function getSays(){
    fs.readFile("random.txt", "utf8", function(error, data) {
        // If the code experiences any errors it will log the error to the console
        if (error) {
          return console.log(`There was a file error ${error}`);
        }
        else{
            // split the text in the file into two different elements of an array
            let dataArr = data.split(",");
            // element 0 will hold the function to be run
            userFunction = dataArr[0];
            // element 1 will hold the parameters for the function to be run with
            userParameters = dataArr[1];
            // trigger switcher() to make the call happen with the above options
            switcher();
        }

    });
}

// global state: activate the switcher
switcher();

// stretch/bonus goals: 
// 1. output the data to a .txt file called log.txt
    // yes, I did this 
// 2. Make sure you append each command you run to the log.txt file
    // yes, it uses append instead of write
// 3. Do not overwrite your file each time you run a command
    // yes, it uses append isntead of write