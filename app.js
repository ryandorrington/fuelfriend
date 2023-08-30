const express = require("express");
var axios = require("axios");
var fs = require("fs");
const ejsMate = require("ejs-mate");
const path = require("path");
const getNearbyStations = require("./getNearbyStations");
const getViableRoutes = require("./getViableRoutes");
const getFuelPricesOfViableStations = require("./getFuelPricesOfViableStations");
const getRecommendedStation = require("./getRecommendedStation");



const app = express();
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

require('dotenv').config();
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const PORT = process.env.PORT || 3000;

const getFuelPriceData = (fuelType) => {
	return JSON.parse(fs.readFileSync(`${fuelType}Stations.json`));
};

const directionsResponse = async (origin, destination) => {
	var config = {
		method: "get",
		url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_MAPS_API_KEY}`,
		headers: {},
	};

	response = await axios(config);

	return response;
};

const createRouteLink = (origin, destination, placeID) => {
	return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=Fuel%20Station&waypoint_place_ids=${placeID}`;
};

const getFuelRoute = async (origin, destination, fuelType) => {
	const routeWithoutFuelStop = await directionsResponse(origin, destination);

	const stations = await getNearbyStations(routeWithoutFuelStop, GOOGLE_MAPS_API_KEY);
	const viableRoutes = await getViableRoutes(routeWithoutFuelStop, stations, origin, destination, 6 * 60, GOOGLE_MAPS_API_KEY);
	getFuelPricesOfViableStations(getFuelPriceData(fuelType), viableRoutes);
	const recommendedStation = getRecommendedStation(viableRoutes);
	return createRouteLink(origin, destination, recommendedStation.station);
};

app.get("/", async (req, res) => {
	res.render("app", {GOOGLE_MAPS_API_KEY});
});

app.post("/", async (req, res) => {
	let { origin, destination, fuelType } = req.body;

	let formattedOrigin = origin.replace(/ /g, "+");
	formattedOrigin = formattedOrigin.split(",").join("");

	let formattedDestination = destination.replace(/ /g, "+");
	formattedDestination = formattedDestination.split(",").join("");

	const fuelRoute = await getFuelRoute(formattedOrigin, formattedDestination, fuelType);

	res.redirect(fuelRoute);

	return;
});

app.listen(PORT, () => {
	console.log(`Example app listening on port ${PORT}`);
});
