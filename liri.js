require("dotenv").config();
var keys = require("./keys");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var title = process.argv.slice(3).join("+");
var tweets = "my-tweets";
var spotify = "spotify-this-song";
var movie = "movie-this";
var doThis = "do-what-it-says";

var myTweets = function () {

    var params = {screen_name: 'TraderJ59316067'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].created_at);
            console.log(tweets[i].text);
        };
    };
    
});

};

var spotifySong = function (songTitle) { 
    spotify.search({ 
        type: 'track', 
        query: songTitle, 
        limit: 20 
    }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }; 
      console.log(data);
      console.log(title);
      });
};



if (action === tweets) {

    myTweets();

} else if (action === spotify) {

    spotifySong(title);

} else if (action === movie) {

} else if (action === doThis) {

} else {
    console.log ("no command found");
}
