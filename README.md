# WHAT DOES LIRI DO? 
*This is a simple node.js program that accepts 4 different functions and a few parameters to execute some basic file and API functions. You can use it to get information from Spotify about a song, information from OMDB about a movie, or get the last 20 tweets from a twitter account. This program will output the results of searches to the console. It will also write the results of searches to a log.txt file and add a timestamp to each entry in the text file. It requires an environment file with API keys in order to work. 

# SET UP LIRI
*You will need your own Twitter, Spotify, and OMDB API Keys for the program to work on your computer*
1. Clone this repository to your local computer
2. Create a blank .env file inside the repository folder
3. Copy and paste the following code into .env, replacing each value with your own API Key values

```
# Spotify API keys

SPOTIFY_ID=your spotify id goes here 
SPOTIFY_SECRET=your spotify secret goes here

# Twitter API keys

TWITTER_CONSUMER_KEY=your twitter consumer key goes here
TWITTER_CONSUMER_SECRET=your twitter consume secret goes here
TWITTER_ACCESS_TOKEN_KEY=your twitter access token key goes here
TWITTER_ACCESS_TOKEN_SECRET=your twitter access token secret goes here
```
4. Save the .env file 
5. run npm -i 
 * this will install all of the node packages that this program needs to run 

# HOW TO USE LIRI
1. Syntax
 * node liri.js <function> <parameters>
2. Functions 
 * my-tweets
   * this function searches twitter for the last 20 tweets by a user
 * spotify-this-song
  * this function searches spotify for information on a song
 * movie-this
  * this function searches OMDB for information about a movie
 * do-what-it-says
  * this function automatically runs a function with parameters imported from the random.txt file
3. Parameters 
 * song name
 * twitter username
 * movie title
4. Examples:
 * To get the last 20 tweets from Donald Trump's twitter, run the following command:
  * node liri.js my-tweets realDonaldTrump
 * To get information on the song "The Chosen" by Unearth from Sporitfy, run the following command:
  * node liri.js spotify-this-song the chosen unearth
 * To get information on the movie Aladdin, run the following command: 
  * node liri.js movie-this Aladdin
