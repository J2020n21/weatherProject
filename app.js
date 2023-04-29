const express = require("express");
const https = require("https"); //http moduel to get GET request across the internet
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){res.sendFile(__dirname+"/index.html");

});

app.post("/",function(req,res){
    const query = req.body.cityName;
    const apiKey = "2959c9ba08becf152bbac4e5ae5820f0";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;

    https.get(url, function(response){
        //console.log(response);

        response.on("data",function(data){
            const weatherData = JSON.parse(data); //console.log(weatherData); //check
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon_code = weatherData.weather[0].icon;
            const icon_url = "https://openweathermap.org/img/wn/"+icon_code+"@2x.png"

            res.write("<h1>"+query+"</h1>")
            res.write("<h1>The temperature is :" +temp+"</h1>");
            res.write("<h2>The weather is currently " + description+"<h2>")
            res.write("<img src="+ icon_url+"></img>");
            res.send();
        });

    });
});


app.listen(3000,function(){
    console.log("3000port:server running");
});
