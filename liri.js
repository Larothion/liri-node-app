

var twitApi = require("./keys.js");
var spotify = require('spotify');
var fs = require("fs");
var request = require("request");
var Twitter = require('twitter');

/*store all of the imported api keys into variables... because idk why.*/
var client = new Twitter({
  consumer_key: twitApi.twitterKeys.consumer_key,
  consumer_secret: twitApi.twitterKeys.consumer_secret,
  access_token_key: twitApi.twitterKeys.access_token_key,
  access_token_secret: twitApi.twitterKeys.access_token_secret
});


// Take in the command line arguments
var nodeArgs = process.argv;
var songName = nodeArgs[3];
	var songN = "";
var movieName = nodeArgs[3];
	var movieN = "";
var count = 4;



if (nodeArgs[2] == "spotify-this-song") {

 spotifyThis();

} else if (nodeArgs[2] == "my-tweets") {

	tweetThis();

} else if (nodeArgs[2] == "movie-this") {

	movieThis();

} else if (nodeArgs[2] == "do-what-it-says") {

	sayThis();

}

function spotifyThis(){

for (i=3 ; i < nodeArgs.length ; i++) {
	songN = songN + process.argv[i] + " ";
	songName = songN;
}

fs.readFile("random.txt", "utf8", function(error, response){
   console.log(response);
    spotify.search({ type: 'track', query: songName }, function(err, data) {
       console.log("=========================================");
       //artist name
       console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
       //song name
       console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name, null, 2));
       console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
       //preview link of the song
       console.log("Preview Song: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
       console.log("=========================================");
    });
 });
}//end function

function tweetThis() {

var params = {screen_name: 'nodejs'};
client.get('statuses/user_timeline.json?screen_name=larothion&' + count, function(error, tweets, response) {
  
  for (var i = 0; i < tweets.length; i++) {
           console.log("===================Tweet:" + (i + 1) + "======================");
           console.log(JSON.stringify(tweets[i].created_at, null, 2));
           console.log(JSON.stringify(tweets[i].text, null, 2));
           console.log("================================================");
       }//end for loop

});//end function
}
/*Run a request to the OMDB API with the movie specified*/
function movieThis() {

for (i=3 ; i < nodeArgs.length ; i++) {
	movieN = movieN + process.argv[i] + " ";
	movieName = movieN;
}

 request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&r=json", function(error, response, body) {

	  // If the request is successful (i.e. if the response status code is 200)
	  if (!error && response.statusCode === 200) {

	    // Parsed the body of the site t the relevant content.
	    console.log("Title: " + JSON.parse(body).Title);
		console.log("Year Of Release: " + JSON.parse(body).Year);
		console.log("Rating: " + JSON.parse(body).Rated);
	    console.log("Country: " + JSON.parse(body).Country);
	    console.log("Language: " + JSON.parse(body).Language);
	    console.log("Plot: " + JSON.parse(body).Plot);
	    console.log("Actors: " + JSON.parse(body).Actors);
	  }
	});
}

function sayThis(){



fs.readFile("random.txt", "utf8", function(error, response){
   console.log(response);
    spotify.search({ type: 'track', query: songName }, function(err, data) {
       console.log("=========================================");
       //artist name
       console.log("Artist: " + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
       //song name
       console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name, null, 2));
       console.log("Album Name: " + JSON.stringify(data.tracks.items[0].album.name, null, 2));
       //preview link of the song
       console.log("Preview Song: " + JSON.stringify(data.tracks.items[0].preview_url, null, 2));
       console.log("=========================================");
    });
 });
}//end function




