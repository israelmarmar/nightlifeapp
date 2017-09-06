var Twitter = require("node-twitter-api");

    var twitter = new Twitter({
        consumerKey: "uoqmgicgFUARcjKeds78ocVlj",
    	consumerSecret:"rGDB6sf7qk9hoiDxszEPPGvWlg5V78vEvzethOy6QNPt3DS1AU",
    	callback: "https://nightlifeapp-isrmm.herokuapp.com/access-token"
    });
  

var _requestSecret;
var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

var session=require('express-session');
var cookieParser = require('cookie-parser');
var request = require("request");
var mongodb= require("mongodb");
var MongoClient = mongodb.MongoClient;
var YELP_ID="nM3rD0hDEaAPvGZt9CsHgQ";
var YELP_CLIENT="d5xql3xJuP3UisVzcNDuAkw3BLha3xHGBmMaP81XM54RT59I3izc52pcA302DmXe";
var urldb =process.env.MONGOLAB_URI || 'mongodb://urlshort:78292725@ds127993.mlab.com:27993/israelmarmar';     
var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}};
var db;

app.use(cookieParser());
app.use(session({secret: 'some secret key',resave: "", // add this; choose the value you want from the docs
  saveUninitialized: "" // add this; choose the value you want from the docs
				}));

app.use(express.static(__dirname + '/'));

MongoClient.connect(urldb, function(err, database) {
  if(err) throw err;

  db = database;


});

app.get('/logout', function (req, res) {
	req.session.destroy();
	res.redirect("https://votingapp-isrmm.herokuapp.com");
});

app.get('/', function (req, res) {
    res.sendFile("/main.html",{root: __dirname});
});

app.get('/apijson', function (req, res) {
var loc=req.query.loc;
var token;
var config;

/*
    axios.post('https://api.yelp.com/oauth2/token', { form:{client_id:YELP_ID, client_secret:YELP_CLIENT},
   headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
})
  .then(response => {
=======
 config = { headers: { 'Content-Type': 'form-data' } };

    axios.post('https://api.yelp.com/oauth2/token', { client_id: YELP_ID, client_secret: YELP_CLIENT }, config)
   .then(response => {
>>>>>>> Stashed changes
    console.log(response.data.url);
    console.log(response.data.explanation);
  })
  .catch(error => {
<<<<<<< Updated upstream
    console.log(error.response.data);
  }); 
=======
    console.log(error);
  });
>>>>>>> Stashed changes

  config = {headers: {'Authorization': 'Bearer '+token}};



/*
  axios.get('https://api.yelp.com/v3/businesses/search?id='+YELP_ID+'&oauth_consumer_key='+YELP_CLIENT+'&location='+loc, config)
  .then(function(result){
    res.json(result.data);
  });  
<<<<<<< Updated upstream

  */
  
  function countvl(obj,id){
	  return obj.filter(function(v) {
  return v.idloc===id;
}).length;
  }
  
  var options = { method: 'POST',
  "rejectUnauthorized": false, 
  url: 'https://api.yelp.com/oauth2/token',
  headers: 
   {'cache-control': 'no-cache',
     'content-type': 'application/x-www-form-urlencoded' },
  form: {client_id:YELP_ID, client_secret:YELP_CLIENT } };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		token=JSON.parse(body).access_token;
		
		 options = { method: 'GET',
		 "rejectUnauthorized": false, 
  url: 'https://api.yelp.com/v3/businesses/search?term=restaurant&id='+YELP_ID+'&oauth_consumer_key='+YELP_CLIENT+'&location='+encodeURI(loc),
  headers: {'Authorization': 'Bearer '+token} };

	request(options, function (error, response, body) {
		if (error) throw new Error(error);

		var json=JSON.parse(body).businesses;
		
		var array=[];
		for(var i=0;i<json.length;i++){
		array.push(json[i].id);	
		}
		
		db.collection("nightlife").find( { idloc: { $in: array } }).toArray(function(err, result) {
			if (err) throw err;
			
			for(var i=0;i<json.length;i++){
			json[i].going=countvl(result,json[i].id);	
			}
			
		res.json(json);
	
		});
		
		});
		

		});
		
	

});

app.get("/going", function(req, res) {
      var id=req.query.id;
		if(req.session.user){
			var resp=res;
			console.log(req.session.user);
			var query={user: req.session.user.user,idloc:id};
			db.collection("nightlife").find(query).toArray(function(err, result) {
			if (err) throw err;
			
				if(result.length==0){
					
				db.collection("nightlife").insertOne({user:req.session.user.user,idloc:id}, function(err, res) {
				if (err) throw err;
					console.log("add");
					db.collection("nightlife").count({idloc:id}).then(function(value){
						console.log("count");
						resp.json({msg:value});
					});
				
				});
				}else{
				db.collection("nightlife").deleteOne({user:req.session.user.user,idloc:id}, function(err, obj) {
				if (err) throw err;
					db.collection("nightlife").count({idloc:id}).then(function(value){
					resp.json({msg:value});
					});
				});
				}
			
			});
			
		}else{
			res.json({msg:"User is not signed"});
		}
});

app.get("/request-token", function(req, res) {
        twitter.getRequestToken(function(err, requestToken, requestSecret) {
            if (err)
                res.status(500).send(err);
            else {
                _requestSecret = requestSecret;         
                res.redirect("https://api.twitter.com/oauth/authenticate?oauth_token=" + requestToken);
            }
        });
    });
	
  
 app.get("/access-token", function(req, res) {
        var requestToken = req.query.oauth_token,
      verifier = req.query.oauth_verifier;

        twitter.getAccessToken(requestToken, _requestSecret, verifier, function(err, accessToken, accessSecret) {
            if (err)
                res.status(500).send(err);
            else
                twitter.verifyCredentials(accessToken, accessSecret, function(err, user) {
                    if (err)
                        res.status(500).send(err);
                    else{
                        req.session.user = user; 
                        res.redirect("https://nightlifeapp-isrmm.herokuapp.com/");
                    }
                });
        });
    });

	
	app.get("/going", function(req, res) {

	 });

app.listen(port, function () {
 console.log("ligado");
});
