const axios = require("axios");

const totalRouteTimeCalculator = (route) => {
	let total = 0;
	for (let i = 0; i < route.legs.length; i++) {
		total += route.legs[i].duration.value;
	}
	return total;
};

// returns a list of the lengths of each route with the station set as a waypoint
const calculateRoutesWithStations = async (stations, origin, destination, GOOGLE_MAPS_API_KEY) => {
	urls = [];
	routesWithStations = [];
	for (station of stations) {
		urls.push(
			`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&waypoints=place_id%3A${station.placeID}&key=${GOOGLE_MAPS_API_KEY}`
		);
	}
	for (url of urls) {
		const config = {
			method: "get",
			url: url,
			headers: {},
		};

		await axios(config)
			.then(function (response) {
				routesWithStations.push({
					station: stations[urls.indexOf(url)].placeID,
					lat: stations[urls.indexOf(url)].lat,
					lng: stations[urls.indexOf(url)].lng,
					distance: totalRouteTimeCalculator(response.data.routes[0]),
				});
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	return routesWithStations;
};

const calculateViableRoutes = (routeWithoutFuelStop, routesWithStations, maxLenghtOfAddedTime) => {
	distanceOfRouteWithoutFuelStop = totalRouteTimeCalculator(routeWithoutFuelStop.data.routes[0]);
	viableRoutes = [];
	for (route of routesWithStations) {
		if (route.distance <= distanceOfRouteWithoutFuelStop + maxLenghtOfAddedTime) {
			viableRoutes.push(route);
		}
	}
	return viableRoutes;
};

getViableRoutes = async (routeWithoutFuelStop, stations, origin, destination, maxLenghtOfAddedTime, GOOGLE_MAPS_API_KEY) => {
	const routesWithStations = await calculateRoutesWithStations(stations, origin, destination, GOOGLE_MAPS_API_KEY);
	const viableRoutes = calculateViableRoutes(
		routeWithoutFuelStop,
		routesWithStations,
		maxLenghtOfAddedTime
	);
	return viableRoutes;
};

module.exports = getViableRoutes;
