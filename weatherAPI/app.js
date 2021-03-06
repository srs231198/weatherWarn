var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");
var alert = require("alert-node");

app.set("view engine", "ejs");

const ejsLint = require('ejs-lint');
ejsLint("results");

app.use(express.static(__dirname + '/public'));
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());

app.get("/", function(req, res) {
    res.render("landing");
});

app.get("/results", function(req, res) {
    var url = "https://www.metaweather.com/api/location/search/?query=" + req.query.user.location;
    
    var locationIdentify = function(){
        request(url, function(error, response, body) {
            if(!error && response.statusCode == 200){
                var data = JSON.parse(body);
                weatherIdentify(data);
            } else {
                console.log(error);
            }
        });
    }
    var weatherIdentify = function(data) {
        // Check for empty object
        if(JSON.stringify(data) !== '[]'){
            var url = "https://www.metaweather.com/api/location/"+ data[0].woeid + "/";
            request(url, function(error, response, body) {
                if(!error && response.statusCode == 200){
                    var data = JSON.parse(body);
                    res.render("results", {data: data});
                } else {
                    console.log(error);
                }
            });            
        }
        else {
            alert('city name unavailable! Sorry!! search for another city!')
            res.redirect("/");
        }
    }
    locationIdentify();
})

app.listen(3000, function(){
    console.log("Weather App has started!!!");
});