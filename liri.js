

var twitApi = require("./keys.js");
var spotify = require('spotify');
var fs = require("fs");
var request = require("request");

/*store all of the imported api keys into variables... because idk why.*/
var consumer_key = twitApi.twitterKeys.consumer_key;
console.log(consumer_key);
var consumer_secret = twitApi.twitterKeys.consumer_secret;
console.log(consumer_secret);
var access_token_key = twitApi.twitterKeys.access_token_key;
console.log(access_token_key);
var access_token_secret = twitApi.twitterKeys.access_token_secret;
console.log(access_token_secret);

// Take in the command line arguments
var nodeArgs = process.argv;
var songName = nodeArgs[3];
var movieName = nodeArgs[3];

if (nodeArgs[2] == "spotify-this-song") {

 readFile();

} else if (nodeArgs[2] == "my-tweets") {

	tweets();

} else if (nodeArgs[2] == "movie-this") {

	movieThis();

}

function readFile(){
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

function tweets() {

}//end function

/*Run a request to the OMDB API with the movie specified*/
function movieThis() {

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


