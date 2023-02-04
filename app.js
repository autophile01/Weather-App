const express = require ("express");
const https = require ("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
         res.sendFile(__dirname +"/index.html");   
});

app.post("/",function(req,res){
const query = req.body.location;
const APIkey = "3a04d04ebe2c8edec997e01af2e72915";
const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&limit=5&appid="+APIkey+"&units=metric";
    https.get(url, function(response){
        response.on("data",function(data){
            console.log(data);
            var WeatherData = JSON.parse(data);
            console.log(WeatherData);
            var WeatherData2 = JSON.stringify(WeatherData);
            console.log(WeatherData2);
            const temp = WeatherData.main.temp;
            console.log(temp);
            const description = WeatherData.weather[0].description;
            console.log(description);
            const icon = WeatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" +icon +"@2x.png"
            res.write("<p>The weather is currently " + description + "</p>");
            res.write("<h1>Temperature in " + query + " is " + temp + " degree celsius.</h1>");
            res.write("<img src="+ imageURL +">");
            res.send();
        })
    })
})














app.listen(3000, function(){
    console.log("Server is running on port 3000");
});