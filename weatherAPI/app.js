var express = require("express");
var app = express();
var request = require("request");
app.set("view engine", "ejs");

// var url = "https://www.metaweather.com/api/location/2388929/";

// request(url, function(error, response, body) {
//     if(!error && response.statusCode == 200){
//         var data = JSON.parse(body);
//         console.log(data["consolidated_weather"][1]["weather_state_name"]);
//     }
// });

app.get("/", function(req, res) {
    res.render("landing");
});

app.listen(3000, function(){
    console.log("Weather App has started!!!");
});