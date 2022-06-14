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
const port = process.env.PORT || 3000;

const getFuelPriceData = () => {
	return JSON.parse(fs.readFileSync("stations.json"));
};

const directionsResponse = async (origin, destination) => {
	var config = {
		method: "get",
		url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyDSy-SjECHR-IUZy39a7N3N0kYO-XzDv68`,
		headers: {},
	};

	response = await axios(config);

	return response;
};

const createRouteLink = (origin, destination, placeID) => {
	return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&waypoints=Fuel%20Station&waypoint_place_ids=${placeID}`;
};

const getFuelRoute = async (origin, destination) => {
	const routeWithoutFuelStop = await directionsResponse(origin, destination);
	const stations = await getNearbyStations(routeWithoutFuelStop);
	const viableRoutes = await getViableRoutes(routeWithoutFuelStop, stations, origin, destination, 6 * 60);
	getFuelPricesOfViableStations(getFuelPriceData(), viableRoutes);
	const recommendedStation = getRecommendedStation(viableRoutes);
	return createRouteLink(origin, destination, recommendedStation.station);
};

app.get("/", (req, res) => {
	res.render("app");
});

// app.get("/route", async (req, res) => {
// 	let { origin, destination } = req.query;

// 	let formattedOrigin = origin.replace(/ /g, "+");
// 	formattedOrigin = formattedOrigin.split(",").join("");

// 	let formattedDestination = destination.replace(/ /g, "+");
// 	formattedDestination = formattedDestination.split(",").join("");

// 	const fuelRoute = await getFuelRoute(formattedOrigin, formattedDestination);

// 	res.render("route", { origin, destination, fuelRoute });
// });

app.post("/", async (req, res) => {
	let { origin, destination } = req.body;

	let formattedOrigin = origin.replace(/ /g, "+");
	formattedOrigin = formattedOrigin.split(",").join("");

	let formattedDestination = destination.replace(/ /g, "+");
	formattedDestination = formattedDestination.split(",").join("");

	const fuelRoute = await getFuelRoute(formattedOrigin, formattedDestination);

	res.redirect(fuelRoute);
	// res.redirect(`/route?origin=${origin}&destination=${destination}`);

	return;
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
