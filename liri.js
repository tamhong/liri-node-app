require("dotenv").config();
var keys = require("./keys");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var songQuery;
var movieQuery;
var title = process.argv.slice(3).join("+");
if (!title) {
    songQuery = "The Sign by Ace of Base"
    movieQuery = "Mr+Nobody"
} else {
    songQuery = title;
    movieQuery = title;
}

var myTweets = function () {

    var params = {screen_name: 'TraderJ59316067'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
            console.log ('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        };
    };
    
});

};

var spotifySong = function (songTitle) { 
    spotify.search({ 
        type: 'track', 
        query: songTitle,
        limit: 1
    }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("Title: " + data.tracks.items[0].name);
        console.log("Artist: " + data.tracks.items[0].album.artists[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("Preview URL: " +data.tracks.items[0].external_urls.spotify);
        console.log ('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

      });
};

var movieThis = function () {
    request('http://www.omdbapi.com/?t=' + movieQuery + '&y=&plot=short&apikey=trilogy', function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("Title: " +JSON.parse(body).Title);
            console.log("Year: " +JSON.parse(body).Year);
            console.log("IMDB Rating: " +JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " +JSON.parse(body).Ratings[1].Value);
            console.log("Country: " +JSON.parse(body).Country);
            console.log("Language: " +JSON.parse(body).Language);
            console.log("Plot: " +JSON.parse(body).Plot);
            console.log("Actors: " +JSON.parse(body).Actors);
            console.log ('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
        }
});
}

var doThis = function () {
    fs.readFile("random.text", "utf8", function (error, data) {
        if (error) {
            return console.log (error);
        }

        var newArr = data.split(",");
        action = newArr[0];
        title = newArr[1].split(" ").join("+");
        if (action == "my-tweets") {
            myTweets();
        } else if (action == "spotify-this-song") {
            spotifySong(title);
        } else if (action == "movie-this") {
            movieThis(title);
        } else {
            console.log("I'm sorry. I can't do that.")
        }
    })
}

switch (action) {
   case "my-tweets":
       myTweets();
       break;

   case "spotify-this-song":
       spotifySong(songQuery);
       break;

   case "movie-this":
       movieThis();
       break;

   case "do-what-it-says":
       doThis();
       break;
}

// if (action === tweets) {

//     myTweets();

// } else if (action === spotify) {

//     spotifySong(title);

// } else if (action === movie) {

// } else if (action === doThis) {

// } else {
//     console.log ("no command found");

// }

// console.log(data.tracks.items[0].name, null, 2));
// console.log(JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
// console.log(JSON.stringify(data.tracks.items[0].album.name, null, 2));
// console.log(JSON.stringify(data.tracks.items[0].external_urls.spotify, null, 2));