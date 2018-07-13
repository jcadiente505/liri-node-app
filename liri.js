// dotenv package configuration
require("dotenv").config();
// spotify and twitter variables for keys access
var twitter = require("twitter");
var twitClient = new twitter(keys.twitter);
var spotify = require("node-spotify-api");
var spotClient = new Spotify(keys.spotify);
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var userInput = process.argv[3];
var userFunc = process.argv[2];

// ==================Functions================ //


// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets() {
    var userName = {screen_name: "CocktailGuru505"};
    twitClient.get("statuses/user_timeline", userName, function(error, response, body) {
        
        console.log(response)
        console.log("===========================")
        console.log(body)
        
        if(!error && response.statusCode === 200) {
            for (var i = 0; i < body.length; i++) {
                console.log(body[i].text)
            }
        }
        else {
            console.log("=========================")
            console.log(error)
            console.log("=========================")
        }
    })

};

myTweets();

// * This will show the following information about the song in your terminal/bash window
// * Artist(s)
// * The song's name
// * A preview link of the song from Spotify
// * The album that the song is from
// * If no song is provided then your program will default to "The Sign" by Ace of Base. 
function spotifySong() {
    
};

// This will output the following information to your terminal/bash window:
//      ```
//        * Title of the movie.
//        * Year the movie came out.
//        * IMDB Rating of the movie.
//        * Rotten Tomatoes Rating of the movie.
//        * Country where the movie was produced.
//        * Language of the movie.
//        * Plot of the movie.
//        * Actors in the movie.
//      ```
//    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
function movieLook() {

};

// Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Feel free to change the text in that document to test out the feature for other commands.
function DoThis() {

};