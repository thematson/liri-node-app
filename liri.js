//let's declare some global variables.

var twitter = require('twitter');
var spotify = require('node-spotify-api');
var request = require('request');
var fs = require('fs');


var song = "";
var movie = "";
var argv = process.argv;
var arg2 = argv[2];

//checks the argument variable and calls the appropriate function
switch (arg2) {
    case 'movie-this':
        movieThis();
        break;

    case 'my-tweets':
        myTweets();
        break;

    case 'spotify-this-song':
        spotifyThis();
        break;

    case 'do-what-it-says':
        doThis();
        break;
}

//spotify function... obviously
function spotifyThis() {    
    //my keys   
    var getspotify = new spotify({
        id: '51ac52b96efd4eaca71848d0659f69a7',
        secret: '23b747190f3441199b2b75f2e0f65a2c'
    });
    //this takes care of multiple word songs
    if (argv.length >= 4) {
        for (var i = 3; i < argv.length; i++) {
            if (i > 3 && i < argv.length) {
                song = song + "+" + argv[i];
            } else {
                song += argv[i];
            }
        }
    //considers anything that has been previously read from random.txt
    } else if (song != "") {
        song = song;
    //the default song
    } else {
        song = 'The Sign ace';
    }
    //get's the info from spotify and then parses out the needed data
    var queryURL = "https://api.spotify.com/v1/search?query=" + song + "&type=track&artist/5ksRONqssB7BR161NTtJAm&offset=0&limit=1";
    getspotify.search({
        type: 'track',
        query: song,
        limit: 1
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var dataInfo = data.tracks.items[0];
        console.log('');
        console.log('༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽');
        console.log('');   
        console.log('The name of the artist is ' + dataInfo.artists[0].name);
        console.log('The name of the song is ' + dataInfo.name);
        if (dataInfo.preview_url != null) {
            console.log('The preview URL is ' + dataInfo.preview_url);
        } else {
            console.log('Unfortunately, there is no track preview on Spotify');
        }
        console.log('This song is from the album ' + dataInfo.album.name);
        console.log('');
        console.log('༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽');
        console.log('');   
    });
}
  //twitter function  
function myTweets() {
//go gets the keys
    var twitterKeys = require('./keys.js');
    var client = twitter(twitterKeys);

    var queryURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=the_hungrycoder&count=20";
//gets the info and then displays it to console log... limited to 20 tweets as per above ^^ query
    client.get(queryURL, function (error, tweets) {
        for (var i = 0; i < tweets.length; i++) {
            if (error) throw error;
            console.log("");
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);

            console.log('-------------------------');
        }
    });
}

// movie function 
function movieThis() {
    // first part if if/else considers multi-worded titles (similar to spotify)
    if (argv.length >= 4) {
        for (var i = 3; i < argv.length; i++) {
            if (i > 3 && i < argv.length) {
                movie = movie + "+" + argv[i];
            } else {
                movie += argv[i];
            }
        } 
    //considers anything that has been previously read from random.txt
    } else if (movie != "") {
        movie = movie;
    //default movie
    } else {
        movie = 'Mr. + Nobody';
    }
    // Then run a request to the OMDB API with the movie specified
    var queryURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";
    request(queryURL, function (error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {

            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log('');
            console.log('༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽');
            console.log('');                
            console.log("Title of the movie: " + JSON.parse(body).Title);
            console.log('');
            console.log("!!!! I can't believe this is the movie you chose!!!!!");
            console.log('');
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating of the movie: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
            console.log('');                
            console.log('༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽ ༼∵༽ ༼⍨༽ ༼⍢༽ ༼⍤༽');
            console.log('');

        }
    });

}
//the read function
function doThis() {
    //reads random.txt and puts the data in an array
    fs.readFile("random.txt", "utf8", (err, data) => {
        if (err) throw error;
        var dataArr = data.split(",");
    //sets the variable of arg2 to use below... similar to above code
        arg2 = (dataArr[0]);
        switch (arg2) {
            case 'movie-this':
                movie = dataArr[1];
                movieThis();
                break;
        
            case 'my-tweets':
                myTweets();
                break;
        
            case 'spotify-this-song':
                song = dataArr[1];
                spotifyThis();                
                break;
        
            case 'do-what-it-says':
                doThis();
                break;
        }


    });
}

