// Import the required modules
const express = require("express");
const app = express();
const {timeOfDay} = require("./functions/greetings")

const {
    sampleResponse,
    locationSample
} = require("./functions/mockend"); // Importing mock data for responses
const {
    currentCityName,
    weatherData,
    getIpInfo,
    citySearch,
    timeZoneTime
} = require("./functions/logic"); // Importing logic functions for processing data
require('dotenv').config(); // Load environment variables from a .env file

// Set the port for the server to run on
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(express.json()); // Parse JSON data in requests
app.set("view engine", "ejs"); // Set EJS as the view engine
app.use(express.static(__dirname + "/views/public")); // Serve static files from the "public" directory

// Route to render the index page
app.get("/", (req, res) => {
    res.render("index");
});

// Route to provide sample weather data
app.get("/api/weather/me", (req, res) => {
    res.json(sampleResponse);
});

// Route to provide sample location data
app.get("/api/location", (req, res) => {
    res.json(locationSample);
});




















// Route to get location name based on latitude and longitude
app.get("/api/locationName/:latitude/:longitude", async (req, res) => {
    let information = await currentCityName(req.params.latitude, req.params.longitude);
    res.json(information);
});
app.get("/api/search/:searchQuery", async(req, res)=>{
    res.json(await citySearch(req.params.searchQuery))
})
// Route to get weather data based on location name
app.get("/api/me/:latitude/:longitude", async (req, res) => {
    let information = await weatherData(req.params.longitude, req.params.latitude);
    res.json(information);
});

app.get("/api/me/:ipaddress", async (req, res)=>{
    console.log(req.params.ipaddress);
    console.log("Searching for location from ip address")
    res.json(await getIpInfo(req.params.ipaddress))
})

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`server is now running on port ${PORT}`);
});

app.get("/greetings/:hour/:day", (req, res)=>{
    res.json(timeOfDay(req.params.hour, req.params.day))
})
app.get("/api/time/:longitude/:latitude", async(req, res)=>{
    console.log(await timeZoneTime(req.params.longitude, req.params.latitude))
    res.send(await timeZoneTime(req.params.longitude, req.params.latitude))
})