var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.set("view engine", "ejs");

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
    console.log(url);
    
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
        var url = "https://www.metaweather.com/api/location/"+ data[0].woeid + "/";
        request(url, function(error, response, body) {
            if(!error && response.statusCode == 200){
                var data = JSON.parse(body);
                console.log(data["consolidated_weather"][0]["weather_state_name"]);
                res.render("results", {data: data});
            } else {
                console.log(error);
            }
        });
    }
    locationIdentify();
})

app.listen(3000, function(){
    console.log("Weather App has started!!!");
});