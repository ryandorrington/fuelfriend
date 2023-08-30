var axios = require("axios");
const polylineDecode = require("./polylineDecode");

// pushes the lat long data of the start, quarter way, half way, 3 quarter way and end of the route to the array
const getFivePointsAlongRoute = (latLongDataOfRoute) => {
	var points = [];
	for (let i = 0; i <= 1; i = i + 0.25) {
		if (i === 0) {
			points.push(latLongDataOfRoute[Math.floor(latLongDataOfRoute.length * i)]);
		} else {
			points.push(latLongDataOfRoute[Math.floor(latLongDataOfRoute.length * i - 1)]);
		}
	}
	return points;
};

// searches for stations within a radius of 2km of the given five points
const findNearbyStations = async (fivePointsAlongRoute, GOOGLE_MAPS_API_KEY) => {
	const urls = [];
	const stations = [];

	for (point of fivePointsAlongRoute) {
		urls.push(
			`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${point[0]}%2C${point[1]}&radius=2000&type=gas_station&key=${GOOGLE_MAPS_API_KEY}`
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
				for (station of response.data.results) {
					stations.push({
						lat: station.geometry.location.lat,
						lng: station.geometry.location.lng,
						placeID: station.place_id,
					});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	return stations;
};

function removeDuplicateStationsFromArray(array) {
	let check = {};
	let res = [];
	for (let i = 0; i < array.length; i++) {
		if (!check[array[i]["placeID"]]) {
			check[array[i]["placeID"]] = true;
			res.push(array[i]);
		}
	}
	return res;
}

getListOfNearbyStations = async (routeWithoutFuelStop, GOOGLE_MAPS_API_KEY) => {
	const latLongDataOfRoute = polylineDecode(routeWithoutFuelStop.data.routes[0].overview_polyline.points);
	const fivePointsAlongRoute = getFivePointsAlongRoute(latLongDataOfRoute);
	const stations = await findNearbyStations(fivePointsAlongRoute, GOOGLE_MAPS_API_KEY);

	return removeDuplicateStationsFromArray(stations);
};

module.exports = getListOfNearbyStations;
