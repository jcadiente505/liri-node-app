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
var userInput = "";
var userComm = process.argv[2];

for (var i = 3; i < process.argv.length; i++) {
    userInput += process.argv[i] + " ";
};

// Create the log.txt file

// fs.writeFile("log.txt", "Added Content, ", error => {
//     if (error) {
//         console.log("===============================")
//         console.log(error)
//         console.log("===============================")
//     }
//     else {
//         console.log("log.txt was updated!")
//     };
// })

// ==================Functions================ //


// This will show your last 20 tweets and when they were created at in your terminal/bash window.
function myTweets() {

    var userName = { screen_name: userInput, count: 20 };
    console.log(userName)
    twitClient.get('statuses/user_timeline', userName, (error, tweets, response) => {

        if (error) {
            console.log("=========================")
            return console.log(error)
            console.log("=========================")
        }

        // loop through the length of the tweets and displays each one 
        if (!error && response.statusCode === 200) {
            for (var i = 0; i < tweets.length; i++)
                var tweetsArr = tweets[i].text
            console.log(tweetsArr)
            // update the log.txt with displayed tweets
            fs.appendFile('./log.txt', 'UserCommand: my-tweets:\n' + tweetsArr + '\n', (error) => {
                if (error) throw error;
            });
        };
    });
};


function spotifySong() {

    fs.appendFile('./log.txt', 'User Command: spotify-this-song ' + userInput + '\n', (error) => {
        if (error) throw error;
    });

    // setting the spotify search function to look through returned song selection
    spotClient.search({ type: "track", query: userInput, limit: 1 }, (error, data) => {
        // * This will show the following information about the song in your terminal/bash window
        if (!error) {

            var songInfo = [
                // * Artist(s)
                "Artist Name: " + data.tracks.items[0].artists[0].name,
                // // // * The song's name
                "Song Name: " + data.tracks.items[0].name,
                // // * A preview link of the song from Spotify
                "Song Preview: " + data.tracks.items[0].preview_url,
                // // * The album that the song is from
                "Album Name: " + data.tracks.items[0].album.name,
            ]

            for (var i = 0; i < songInfo.length; i++) {

                var songArr = songInfo[i]

                console.log(songArr)

                fs.appendFile('./log.txt', '\n' + songArr + '\n', (error) => {
                    if (error) throw error;
                });
            };
        }
        else {
            console.log("==========================")
            console.log(error)
            console.log("==========================")
        };
        // * If no song is provided then your program will default to "The Sign" by Ace of Base. 
    });
};


function movieLook() {

    fs.appendFile('./log.txt', 'User Command: movie-this: ' + userInput + '\n', (error) => {
        if (error) throw error;
    });

    userInput = userInput.split(' ').join('+');

    request("http://www.omdbapi.com/?t=" + userInput + "&apikey=trilogy", (error, response, body) => {

        if (error) {
            console.log("============================================")
            console.log(error)
            console.log("============================================")
        }
        else if (!error && response.statusCode === 200) {

            var body = JSON.parse(body)

            var movieInfo = [
                // This will output the following information to your terminal/bash window:
                // ```
                // * Title of the movie.
                "Title: " + body.Title,
                // * Year the movie came out.
                "Year: " + body.Year,
                // * IMDB Rating of the movie.
                "IMDB: " + body.imdbRating,
                // * Rotten Tomatoes Rating of the movie.
                "Rotten Tomatoes: " + body.tomatoRating,
                // * Country where the movie was produced.
                "Country: " + body.Country,
                // * Language of the movie.
                "Language: " + body.Language,
                // * Plot of the movie.
                "Plot: " + body.Plot,
                // * Actors in the movie.
                "Actors: " + body.Actors,
                // ```
            ];

            for (var i = 0; i < movieInfo.length; i++) {

                var movieArr = movieInfo[i]

                console.log(movieArr)

                fs.appendFile('./log.txt', '\n' + movieArr + '\n', (error) => {
                    if (error) throw error;
                });
            };
        }
    });
    //    * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

};


function doThis() {
    // Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
    //      * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
    //      * Feel free to change the text in that document to test out the feature for other commands.

    fs.appendFile('./log.txt', 'User Command: do-what-it-says\n\n', (error) => {
        if (error) throw error;
    });

    fs.readFile('./random.txt', 'utf8', (error, data) => {
        if (error) {
            console.log("=======================")
            console.log(error);
            console.log("=======================")
        }
        else {
            // Split out the command name and the parameter name
            var cmdString = data.split(',');
            var command = cmdString[0].trim();
            var input = cmdString[1].trim();

            switch (command) {
                case 'my-tweets':
                    myTweets();
                    break;

                case 'spotify-this-song':
                    spotifySong(input);
                    break;

                case 'movie-this':
                    movieLook(input);
                    break;
            };
        };
    });
};

// ==================SWITCH STATEMENT=========================== //

switch (userComm) {
    case "my-tweets":
        if (userInput) {
            myTweets();
        }
        else {
            myTweets("CGuru505")
        };
        break;
    case "spotify-this-song":
        if (userInput) {
            spotifySong();
        }
        else {
            spotifySong("The Climb")
        };
        break;
    case "movie-this":
        if (userInput) {
            movieLook();
        }
        else {
            movieLook("Mr. Nobody")
        };
        break;
    case "do-what-it-says":
        doThis();
        break;
    default:
        console.log("Enter one of these Commands:")
        console.log("1.my-tweets + twitter handle")
        console.log("2.spotify-this-song + song name")
        console.log("3.movie-this + movie-name")
        console.log("4.do-what-it-says")
};