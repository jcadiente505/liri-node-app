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

// Create the log.txt file

fs.writeFile("log.txt", "Added Content, ", function (error) {
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
    twitClient.get('statuses/user_timeline', userName, function (error, body, response) {

        if (error) {
            console.log("=========================")
            return console.log(error)
            console.log("=========================")
        }

        // loop through the length of the tweets and displays each one 
        if (!error && response.statusCode === 200) {
            for (var i = 0; i < body.length; i++) {
                // console.log(body[i].text)
                var tweetsArr = body[i].text
                console.log(tweetsArr)
                // update the log.txt with displayed tweets
                fs.appendFile("log.txt", tweetsArr + ", ", function (error) {
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
        };
    });
};


function spotifySong() {

    // spotClient.clientCredentialsGrant().then(

    //     function(data) {
    //       console.log('The access token expires in ' + data.body['expires_in']);
    //       console.log('The access token is ' + data.body['access_token']);
      
    //       // Save the access token so that it's used in future calls
    //       spotifyApi.setAccessToken(data.body['access_token']);
    //     },
    //     function(err) {
    //       console.log(
    //         'Something went wrong when retrieving an access token',
    //         err.message
    //       );
    //     }
    //   );
    // setting the spotify search function to look through returned song selection
    spotClient.search({ type: "track", query: userInput, limit: 1 }, function (error, data) {
        // * This will show the following information about the song in your terminal/bash window
        if (!error) {

            console.log(data)
            // * Artist(s)

            // * The song's name

            // * A preview link of the song from Spotify

            // * The album that the song is from
        }
        else {
            console.log("==========================")
            console.log(error)
            console.log("==========================")
        };
        // * If no song is provided then your program will default to "The Sign" by Ace of Base.     
    });
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