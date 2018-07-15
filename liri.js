// dotenv package configuration
require('dotenv').config();
// spotify and twitter variables for keys access
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var twitter = require("twitter");
var spotify = require("node-spotify-api");
var twitClient = new twitter(keys.twitter);
var spotClient = new spotify(keys.spotify);
var userInput = process.argv[3];
var userComm = process.argv[2];

for (var i = 3; i < process.argv.length; i++) {
    userInput = userInput + " " + process.argv[i]
};

// Create the log.txt file

fs.writeFile("log.txt", "Added Content, ", error => {
    if (error) {
        console.log("===============================")
        console.log(error)
        console.log("===============================")
    }
    else {
        console.log("log.txt was updated!")
    };
})

// ==================Functions================ //


// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets() {
    var userName = { screen_name: userInput };
    twitClient.get('statuses/user_timeline', userName, (error, body, response) => {

        if (error) {
            console.log("=========================")
            return console.log(error)
            console.log("=========================")
        }

        // loop through the length of the tweets and displays each one 
        if (!error && response.statusCode === 200) {
            for (var i = 0; i < body.length; i++)
                var tweetsArr = body[i].text
            console.log(tweetsArr)
            // update the log.txt with displayed tweets
            fs.appendFile("log.txt", tweetsArr + ", ", error => {
                if (error) {
                    console.log("==================")
                    console.log(error)
                    console.log("==================")
                }
                else {
                    console.log("added too log.txt!")
                };
            });
        };
    });
};


function spotifySong() {
    if (!userInput) {
        userInput = "The Sign"
    };
    // setting the spotify search function to look through returned song selection
    spotClient.search({ type: "track", query: userInput, limit: 1 }, (err, data) => {
        // * This will show the following information about the song in your terminal/bash window
        if (!err) {


            // * Artist(s)
            console.debug("Artist Name: " + JSON.stringify(data.tracks.items[0].artists[0].name))
            // // // * The song's name
            console.debug("Song Name: " + JSON.stringify(data.tracks.items[0].name))
            // // * A preview link of the song from Spotify
            console.debug("Song Preview: " + JSON.stringify(data.tracks.items[0].preview_url))
            // // * The album that the song is from
            console.debug("Album Name: " + JSON.stringify(data.tracks.items[0].album.name))
        }
        else {
            console.log("==========================")
            console.log(err)
            console.log("==========================")
        };
        // * If no song is provided then your program will default to "The Sign" by Ace of Base. 
    });
};


function movieLook() {
    request("http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy", (error, response, body) => {

        if (error) {
            console.log("============================================")
            console.log(error)
            console.log("============================================")
        }
        else if (!error && response.statusCode === 200) {

            console.log(JSON.parse(body))
            // This will output the following information to your terminal/bash window:
            // ```
            // * Title of the movie.
            console.log(JSON.stringify(body.Title))
            // * Year the movie came out.
            // console.log(JSON.parse(body.Year))
            // // * IMDB Rating of the movie.
            // console.log(JSON.parse(body.imdbRating))
            // // * Rotten Tomatoes Rating of the movie.
            // console.log(JSON.parse(body.Ratings.Source))
            // console.log(JSON.parse(body.Ratings.Value))
            // // * Country where the movie was produced.
            // console.log(JSON.parse(body.Country))
            // // * Language of the movie.
            // console.log(JSON.parse(body.Language))
            // // * Plot of the movie.
            // console.log(JSON.parse(body.Plot))
            // // * Actors in the movie.
            // console.log(JSON.parse(body.Actors))
            // ```
        }
    });
    //    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

};

// Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
//      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
//      * Feel free to change the text in that document to test out the feature for other commands.
function doThis() {

};

// ==================SWITCH STATEMENT=========================== //

switch (userComm) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifySong();
        break;
    case "movie-this":
        movieLook();
        break;
    case "do-what-it-says":
        doThis();
        break;
};