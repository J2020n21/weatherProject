const express = require("express");
const https = require("https"); //http moduel to get GET request across the internet

const app = express();

app.get("/",function(req,res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Seoul&callback=test&appid=2959c9ba08becf152bbac4e5ae5820f0&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){//response data
            //get JSON object
            const weatherData = JSON.parse(data); //console.log(weatherData); //check
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon_code = weatherData.weather[0].icon;
            const icon_url = "https://openweathermap.org/img/wn/"+icon_code+"@2x.png"

            res.write("<h1>The temperature is :" +temp+"</h1>");
            res.write("<h2>The weather is currently " + description+"<h2>")
            res.write("<img src="+ icon_url+"></img>");
            res.send();

        });
    });

    res.send("Running");
});


app.listen(3000,function(){
    console.log("3000port:server running");
});
