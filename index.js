const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const n1 = req.body.city;
    const m = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+n1+"&appid=ef5d1ce3f8ca5d986a14c669cd4aa1e5";
    https.get(url, function (response) {
        response.on("data",function(data)
        {
            const weatherobj=JSON.parse(data);
            const ic=weatherobj.weather[0].icon;
            const temp1=weatherobj.main.temp;
            res.write("<h1> The temperature at "+ n1 + " is " +temp1 + "</h1>");
            res.write("<img src=http://openweathermap.org/img/w/"+ic+".png>");
            res.send();
        })
    })
})


app.listen("3000", function (req, res) {
    console.log("Server running at port 3000");
});
