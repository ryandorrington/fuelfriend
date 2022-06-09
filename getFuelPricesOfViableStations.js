function merge(arr1, arr2) {
	let results = [];
	let i = 0;
	let j = 0;
	while (i < arr1.length && j < arr2.length) {
		if (arr2[j].latitude > arr1[i].latitude) {
			results.push(arr1[i]);
			i++;
		} else {
			results.push(arr2[j]);
			j++;
		}
	}
	while (i < arr1.length) {
		results.push(arr1[i]);
		i++;
	}
	while (j < arr2.length) {
		results.push(arr2[j]);
		j++;
	}
	return results;
}

function mergeSort(arr) {
	if (arr.length <= 1) return arr;
	let mid = Math.floor(arr.length / 2);
	let left = mergeSort(arr.slice(0, mid));
	let right = mergeSort(arr.slice(mid));
	return merge(left, right);
}

const getListOfCoords = (stations) => {
	listOfCoords = [];

	for (station of stations) {
		listOfCoords.push({
			lat: parseFloat(station.latitude.toString().slice(0, 6)),
			lng: parseFloat(station.longitude.toString().slice(0, 6)),
		});
	}
	return listOfCoords;
};

function matchStations(listOfCoords, station) {
	const listOfLats = [];
	const listOfLngs = [];
	for (coord of listOfCoords) {
		listOfLats.push(coord.lat);
		listOfLngs.push(coord.lng);
	}
	const stationLat = parseFloat(station.lat.toString().slice(0, 6));
	const stationLng = parseFloat(station.lng.toString().slice(0, 6));

	var start = 0;
	var end = listOfCoords.length - 1;
	var middle = Math.floor((start + end) / 2);
	while (listOfLats[middle] !== stationLat && start <= end) {
		if (stationLat > listOfLats[middle]) end = middle - 1;
		else start = middle + 1;
		middle = Math.floor((start + end) / 2);
	}

	if (listOfLats[middle] === stationLat) {
		let tracker = middle;
		while (true) {
			if (listOfLats[tracker] !== listOfLats[middle]) {
				break;
			}
			if (listOfLngs[tracker] === stationLng) {
				return tracker;
			}
			tracker--;
		}
		tracker = middle + 1;
		while (true) {
			if (listOfLats[tracker] !== listOfLats[middle]) {
				break;
			}
			if (listOfLngs[tracker] === stationLng) {
				return tracker;
			}
			tracker++;
		}
	}
	return -1;
}

getFuelPrices = (fuelPriceData, viableStations) => {
	const sortedPriceData = mergeSort(fuelPriceData);
	const listOfCoords = getListOfCoords(sortedPriceData);
	for (station of viableStations) {
		matchingStationIndex = matchStations(listOfCoords, station);

		if (matchingStationIndex !== -1) {
			station.price = sortedPriceData[matchingStationIndex].price;
		}
	}
	return viableStations;
};

module.exports = getFuelPrices;
