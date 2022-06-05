const express = require("express");
var axios = require("axios");
const getNearbyStations = require("./getNearbyStations");
const getViableRoutes = require("./getViableRoutes");

const app = express();
const port = 3000;

const origin = "72+wimbledon+drive+kingsley+WA";
const destination = "26+walters+drive+osbornepark+WA";

const directionsResponseExample = async (origin, destination) => {
	var config = {
		method: "get",
		url: `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyDSy-SjECHR-IUZy39a7N3N0kYO-XzDv68`,
		headers: {},
	};

	response = await axios(config);

	return response;
};

app.get("/", async (req, res) => {
	const routeWithoutFuelStop = await directionsResponseExample(origin, destination);
	const stations = await getNearbyStations(routeWithoutFuelStop);
	const viableRoutes = await getViableRoutes(routeWithoutFuelStop, stations, origin, destination, 6 * 60);
	console.log(viableRoutes);
	res.send("hello world");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
