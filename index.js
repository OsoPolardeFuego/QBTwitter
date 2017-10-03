console.log("bot starting");
var Twit = require("twit");
var config = require("./config");
var T = new Twit(config);
var cheerio = require("cheerio");
var request = require("request");

var urls = [];


request("http://www.reddit.com",function(err,resp,body){
	if(!err && resp.statusCode ==200){
		var $ = cheerio.load(body);
		$("a.title", "#siteTable").each(function(){
			var url = $(this).attr("href");
				if(url.indexOf("i.imgur.com")>-1){
					urls.push(url);
					T.post('statuses/update',{status: "running a test " + url},function(err,data,response){
					console.log(data.text);})
					}
				
		});
		
		console.log(urls);
	} 
});


/*
tweetIt();


function tweetIt(){
	
	var tweet = {
		status: "hello again"
	}
  
	T.post('statuses/update',tweet,tweeted)
  
	function tweeted(err,data,response){
		console.log(data.text);

	}

}
*/







