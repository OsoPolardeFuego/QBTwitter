console.log("bot starting");
var Twit = require("twit");
var config = require("./config");
var T = new Twit(config);
var cheerio = require("cheerio");
var request = require("request");

const QuickBase = require('quickbase');


const quickbase = new QuickBase({
    realm: 'sympo',
    //appToken: 'cgvhqmbqpjmprcunzb2vbr2byam',
    userToken: 'b3f4pg_5wh_ki6vnabkicciwky4fp6b4dc535'
    
});

var urls = [];

request("http://www.reddit.com",function(err,resp,body){
	if(!err && resp.statusCode ==200){
		var $ = cheerio.load(body);
		$("a.title", "#siteTable").each(function(){
			var url = $(this).attr("href");
				if(url.indexOf("i.imgur.com")>-1){
					urls.push(url);
					
					T.post('statuses/update',{status: "running a test " + url},function(err,data,response){
					console.log(data.text);});
					
					quickbase.api('API_AddRecord', {dbid: 'bm5upidse',     
					fields: [{ fid: 6, value:url}],
						//disprec: false,
						//fform: false,
						//ignoreError: false,
						//msInUTC: false
						});
					
					}
				
		});
		
		console.log(urls);
	} 
});









