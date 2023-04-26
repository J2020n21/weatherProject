const express = require("express");
const https = require("https"); //http moduel to get GET request across the internet

const app = express();

app.get("/",function(req,res){

    const url = "https://api.openweathermap.org/data/2.5/weather?q=Seoul&callback=test&appid=2959c9ba08becf152bbac4e5ae5820f0&units=metric";

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            //console.log(data); //data printed in hexadecimal numbers
            //const weatherData = JSON.parse(data) //data(string) into actal js object.(json format)
            //error: JSON format not matching; token 'e'?
            //console.log(weatherData); //check parsed data
            //make javascript into a string: JSON.stringify()

           // const temp = weatherData.main.temp
           // console.log(temp);

        });
    });

    res.send("Running");
});


app.listen(3000,function(){
    console.log("3000port:server running");
});
