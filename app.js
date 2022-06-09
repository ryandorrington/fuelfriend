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
const port = 3000;

const origin = "72+wimbledon+drive+kingsley+WA";
const destination = "99+shepperton+road+victoria+park";

const getFuelPriceData = () => {
	return JSON.parse(fs.readFileSync("stations.json"));
};

const directionsResponseExample = async (origin, destination) => {
	var config = {
		method: "get",
		url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyDSy-SjECHR-IUZy39a7N3N0kYO-XzDv68`,
		headers: {},
	};

	response = await axios(config);

	return response;
};

const createRouteLink = (placeID) => {
	return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=FuelStation&waypoint_place_ids=${placeID}`;
};

const getFuelRoute = async () => {
	const routeWithoutFuelStop = await directionsResponseExample(origin, destination);
	const stations = await getNearbyStations(routeWithoutFuelStop);
	const viableRoutes = await getViableRoutes(routeWithoutFuelStop, stations, origin, destination, 6 * 60);
	getFuelPricesOfViableStations(getFuelPriceData(), viableRoutes);
	const recommendedStation = getRecommendedStation(viableRoutes);
	console.log("the best route is: " + createRouteLink(recommendedStation.station));
};

app.get("/", (req, res) => {
	// getFuelRoute()
	res.render("app");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
