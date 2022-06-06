const { get } = require("http");

const sampleData = [
	{
		title: "189.3: Shell Alkimos",
		description: "Address: 12 Longstaff Ave, ALKIMOS, Phone: (08) 9554 2372",
		brand: "Shell",
		date: "2022-06-06",
		price: "189.3",
		"trading-name": "Shell Alkimos",
		location: "ALKIMOS",
		address: "12 Longstaff Ave",
		phone: "(08) 9554 2372",
		latitude: "-31.628239",
		longitude: "115.69118",
		"site-features": ", ",
	},
	{
		title: "189.9: Vibe Morley",
		description:
			"Address: 430 Morley Dr, MORLEY, Site features: ATM Air Bottled Gas Discount Voucher EFTPOS Fuel Cards Ice Toilets, Open 24 hours",
		brand: "Vibe",
		date: "2022-06-06",
		price: "189.9",
		"trading-name": "Vibe Morley",
		location: "MORLEY",
		address: "430 Morley Dr",
		phone: null,
		latitude: "-31.887832",
		longitude: "115.889889",
		"site-features": " ATM Air Bottled Gas Discount Voucher EFTPOS Fuel Cards Ice Toilets, Open 24 hours",
	},
	{
		title: "189.9: Ampol Foodary North Wanneroo",
		description:
			"Address: 2624 Wanneroo Rd, NOWERGUP, Phone: (08) 9407 5309, Open Mon-Fri: 05:00-21:00, Sat: 05:00-21:00, Sun: 05:00-21:00",
		brand: "Ampol",
		date: "2022-06-06",
		price: "189.9",
		"trading-name": "Ampol Foodary North Wanneroo",
		location: "NOWERGUP",
		address: "2624 Wanneroo Rd",
		phone: "(08) 9407 5309",
		latitude: "-31.625661",
		longitude: "115.718259",
		"site-features": ", Open Mon-Fri: 05:00-21:00, Sat: 05:00-21:00, Sun: 05:00-21:00",
	},
	{
		title: "189.9: Vibe West Swan",
		description:
			"Address: 6639 West Swan Rd, WEST SWAN, Site features: ATM Air Bottled Gas Discount Voucher EFTPOS Fuel Cards Ice Restaurant, Open Mon-Fri: 05:00-22:00, Sat: 06:00-21:00, Sun: 06:00-21:00",
		brand: "Vibe",
		date: "2022-06-06",
		price: "189.9",
		"trading-name": "Vibe West Swan",
		location: "WEST SWAN",
		address: "6639 West Swan Rd",
		phone: null,
		latitude: "-31.839036",
		longitude: "115.990655",
		"site-features":
			" ATM Air Bottled Gas Discount Voucher EFTPOS Fuel Cards Ice Restaurant, Open Mon-Fri: 05:00-22:00, Sat: 06:00-21:00, Sun: 06:00-21:00",
	},
	{
		title: "191.3: United Bassendean",
		description:
			"Address: 335 Collier Rd, BASSENDEAN, Phone: (08) 6336 7768, Site features: EFTPOS Fuel Cards Ice Water, Open Mon-Fri: 06:00-20:00, Sat: 06:00-19:00, Sun: 06:00-19:00",
		brand: "United",
		date: "2022-06-06",
		price: "191.3",
		"trading-name": "United Bassendean",
		location: "BASSENDEAN",
		address: "335 Collier Rd",
		phone: "(08) 6336 7768",
		latitude: "-31.905283",
		longitude: "115.932367",
		"site-features":
			" EFTPOS Fuel Cards Ice Water, Open Mon-Fri: 06:00-20:00, Sat: 06:00-19:00, Sun: 06:00-19:00",
	},
	{
		title: "191.9: 7-Eleven Bassendean",
		description: "Address: 302-318 Collier Rd, BASSENDEAN, Phone: (08) 9379 9590, Open 24 hours",
		brand: "7-Eleven",
		date: "2022-06-06",
		price: "191.9",
		"trading-name": "7-Eleven Bassendean",
		location: "BASSENDEAN",
		address: "302-318 Collier Rd",
		phone: "(08) 9379 9590",
		latitude: "-31.9063297",
		longitude: "115.9308682",
		"site-features": ", Open 24 hours",
	},
	{
		title: "192.5: United Neerabup",
		description:
			"Address: 2038 Wanneroo Rd, NEERABUP, Phone: (08) 6118 6596, Site features: Air Bottled AdBlue Bottled Gas EFTPOS Fuel Cards Ice Toilets Trailer Hire Truck Friendly Water, Open Mon-Fri: 06:00-19:00, Sat: 06:00-19:00, Sun: 06:00-19:00",
		brand: "United",
		date: "2022-06-06",
		price: "192.5",
		"trading-name": "United Neerabup",
		location: "NEERABUP",
		address: "2038 Wanneroo Rd",
		phone: "(08) 6118 6596",
		latitude: "-31.672434",
		longitude: "115.743141",
		"site-features":
			" Air Bottled AdBlue Bottled Gas EFTPOS Fuel Cards Ice Toilets Trailer Hire Truck Friendly Water, Open Mon-Fri: 06:00-19:00, Sat: 06:00-19:00, Sun: 06:00-19:00",
	},
	{
		title: "192.9: Coles Express Bayswater",
		description:
			"Address: 34 Jackson St, BAYSWATER, Phone: (08) 6157 5678, Open Mon-Fri: 05:00-22:00, Sat: 05:00-20:00, Sun: 07:00-20:00",
		brand: "Coles Express",
		date: "2022-06-06",
		price: "192.9",
		"trading-name": "Coles Express Bayswater",
		location: "BAYSWATER",
		address: "34 Jackson St",
		phone: "(08) 6157 5678",
		latitude: "-31.906734",
		longitude: "115.92665",
		"site-features": ", Open Mon-Fri: 05:00-22:00, Sat: 05:00-20:00, Sun: 07:00-20:00",
	},
	{
		title: "193.5: X Convenience Alkimos",
		description: "Address: 58 Montana Cres, ALKIMOS, Phone: (08) 9562 4320",
		brand: "Puma",
		date: "2022-06-06",
		price: "193.5",
		"trading-name": "X Convenience Alkimos",
		location: "ALKIMOS",
		address: "58 Montana Cres",
		phone: "(08) 9562 4320",
		latitude: "-31.621433",
		longitude: "115.688754",
		"site-features": ", ",
	},
	{
		title: "193.5: Vibe Bassendean",
		description:
			"Address: 309 Guildford Rd, BASSENDEAN, Site features: ATM Air Bottled Gas Discount Voucher EFTPOS Fuel Cards Ice Toilets Trailer Hire Water, Open 24 hours",
		brand: "Vibe",
		date: "2022-06-06",
		price: "193.5",
		"trading-name": "Vibe Bassendean",
		location: "BASSENDEAN",
		address: "309 Guildford Rd",
		phone: null,
		latitude: "-31.901105",
		longitude: "115.959118",
		"site-features":
			" ATM Air Bottled Gas Discount Voucher EFTPOS Fuel Cards Ice Toilets Trailer Hire Water, Open 24 hours",
	},
	{
		title: "193.7: Puma Neerabup",
		description:
			"Address: 2056 Wanneroo Rd, NEERABUP, Phone: (08) 9407 5053, Open Mon-Fri: 05:00-22:00, Sat: 05:00-22:00, Sun: 05:00-22:00",
		brand: "Puma",
		date: "2022-06-06",
		price: "193.7",
		"trading-name": "Puma Neerabup",
		location: "NEERABUP",
		address: "2056 Wanneroo Rd",
		phone: "(08) 9407 5053",
		latitude: "-31.67127",
		longitude: "115.742022",
		"site-features": ", Open Mon-Fri: 05:00-22:00, Sat: 05:00-22:00, Sun: 05:00-22:00",
	},
	{
		title: "193.9: Puma Bayswater",
		description: "Address: 502 Guildford Rd, BAYSWATER, Phone: (08) 9379 1322, Open 24 hours",
		brand: "Puma",
		date: "2022-06-06",
		price: "193.9",
		"trading-name": "Puma Bayswater",
		location: "BAYSWATER",
		address: "502 Guildford Rd",
		phone: "(08) 9379 1322",
		latitude: "-31.919556",
		longitude: "115.929069",
		"site-features": ", Open 24 hours",
	},
	{
		title: "195.9: United Ellenbrook",
		description:
			"Address: 3 Locke Lane, ELLENBROOK, Phone: (08) 6336 7752, Site features: ATM Air Bottled Gas EFTPOS Ice Toilets Trailer Hire Water, Open Mon-Fri: 06:00-22:00, Sat: 06:00-22:00, Sun: 06:00-22:00",
		brand: "United",
		date: "2022-06-06",
		price: "195.9",
		"trading-name": "United Ellenbrook",
		location: "ELLENBROOK",
		address: "3 Locke Lane",
		phone: "(08) 6336 7752",
		latitude: "-31.77852",
		longitude: "115.96699",
		"site-features":
			" ATM Air Bottled Gas EFTPOS Ice Toilets Trailer Hire Water, Open Mon-Fri: 06:00-22:00, Sat: 06:00-22:00, Sun: 06:00-22:00",
	},
	{
		title: "195.9: United Lexia",
		description:
			"Address: 779 Gnangara Rd, LEXIA, Phone: (08) 6336 7753, Site features: ATM Air Bottled Gas EFTPOS Fuel Cards Ice Pumped AdBlue Toilets Trailer Hire Truck Friendly Water, Open Mon-Fri: 05:00-22:00, Sat: 05:00-22:00, Sun: 05:00-22:00",
		brand: "United",
		date: "2022-06-06",
		price: "195.9",
		"trading-name": "United Lexia",
		location: "LEXIA",
		address: "779 Gnangara Rd",
		phone: "(08) 6336 7753",
		latitude: "-31.795189",
		longitude: "115.899559",
		"site-features":
			" ATM Air Bottled Gas EFTPOS Fuel Cards Ice Pumped AdBlue Toilets Trailer Hire Truck Friendly Water, Open Mon-Fri: 05:00-22:00, Sat: 05:00-22:00, Sun: 05:00-22:00",
	},
	{
		title: "195.9: United Tapping",
		description:
			"Address: 1369 Wanneroo Rd, WANNEROO, Phone: (08) 6205 9010, Site features: ATM Air Bottled Gas Discount Voucher EFTPOS Ice Pumped AdBlue Truck Friendly Water, Open Mon-Fri: 05:00-23:00, Sat: 05:00-23:00, Sun: 05:00-23:00",
		brand: "United",
		date: "2022-06-06",
		price: "195.9",
		"trading-name": "United Tapping",
		location: "WANNEROO",
		address: "1369 Wanneroo Rd",
		phone: "(08) 6205 9010",
		latitude: "-31.719744",
		longitude: "115.783408",
		"site-features":
			" ATM Air Bottled Gas Discount Voucher EFTPOS Ice Pumped AdBlue Truck Friendly Water, Open Mon-Fri: 05:00-23:00, Sat: 05:00-23:00, Sun: 05:00-23:00",
	},
	{
		title: "197.5: United Osborne Park",
		description:
			"Address: 479 Scarborough Beach Rd, OSBORNE PARK, Phone: (08) 6336 7755, Open Mon-Fri: 07:00-21:00, Sat: 07:00-20:00, Sun: 07:00-20:00",
		brand: "United",
		date: "2022-06-06",
		price: "197.5",
		"trading-name": "United Osborne Park",
		location: "OSBORNE PARK",
		address: "479 Scarborough Beach Rd",
		phone: "(08) 6336 7755",
		latitude: "-31.904837",
		longitude: "115.80609",
		"site-features": ", Open Mon-Fri: 07:00-21:00, Sat: 07:00-20:00, Sun: 07:00-20:00",
	},
	{
		title: "197.9: Caltex Woolworths Alkimos",
		description:
			"Address: 11 Shorehaven Bvd, ALKIMOS, Phone: (08) 9746 0953, Open Mon-Fri: 05:00-23:00, Sat: 05:00-23:00, Sun: 05:00-23:00",
		brand: "Caltex Woolworths",
		date: "2022-06-06",
		price: "197.9",
		"trading-name": "Caltex Woolworths Alkimos",
		location: "ALKIMOS",
		address: "11 Shorehaven Bvd",
		phone: "(08) 9746 0953",
		latitude: "-31.601902",
		longitude: "115.680898",
		"site-features": ", Open Mon-Fri: 05:00-23:00, Sat: 05:00-23:00, Sun: 05:00-23:00",
	},
	{
		title: "197.9: Caltex Woolworths Aveley",
		description:
			"Address: 317 Millhouse Rd, AVELEY, Phone: (08) 6186 0422, Open Mon-Fri: 05:00-23:00, Sat: 05:00-23:00, Sun: 05:00-23:00",
		brand: "Caltex Woolworths",
		date: "2022-06-06",
		price: "197.9",
		"trading-name": "Caltex Woolworths Aveley",
		location: "AVELEY",
		address: "317 Millhouse Rd",
		phone: "(08) 6186 0422",
		latitude: "-31.777467",
		longitude: "115.987368",
		"site-features": ", Open Mon-Fri: 05:00-23:00, Sat: 05:00-23:00, Sun: 05:00-23:00",
	},
];

const viableRoutesSamples = [
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 1157,
	},
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 1289,
	},
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 1136,
	},
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 1202,
	},
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 1224,
	},
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 1305,
	},
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 1190,
	},
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 1138,
	},
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 1057,
	},
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 903,
	},
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 1009,
	},
	{
		station: "ChIJF8JRs4yvMioRHakg8rwWlP0",
		lat: -31.9136619,
		lng: 115.828545,
		distance: 1088,
	},
];

const example = {
	title: "189.9: Ampol Foodary North Wanneroo",
	description:
		"Address: 2624 Wanneroo Rd, NOWERGUP, Phone: (08) 9407 5309, Open Mon-Fri: 05:00-21:00, Sat: 05:00-21:00, Sun: 05:00-21:00",
	brand: "Ampol",
	date: "2022-06-06",
	price: "189.9",
	"trading-name": "Ampol Foodary North Wanneroo",
	location: "NOWERGUP",
	address: "2624 Wanneroo Rd",
	phone: "(08) 9407 5309",
	latitude: "-31.625661",
	longitude: "115.718259",
	"site-features": ", Open Mon-Fri: 05:00-21:00, Sat: 05:00-21:00, Sun: 05:00-21:00",
};

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

const getListOfLatitudes = (stations) => {
	listOfLatitudes = [];

	for (station of stations) {
		listOfLatitudes.push(parseFloat(station.latitude).toFixed(3));
	}
	return listOfLatitudes;
};

function binarySearch(arr, elem) {
	elem = parseFloat(elem.lat).toFixed(3);
	var start = 0;
	var end = arr.length - 1;
	var middle = Math.floor((start + end) / 2);
	while (arr[middle] !== elem && start <= end) {
		if (elem < arr[middle]) end = middle - 1;
		else start = middle + 1;
		middle = Math.floor((start + end) / 2);
	}

	return arr[middle] === elem ? middle : -1;
}

getFuelPrices = (fuelPriceData, viableStations) => {
	const sortedPriceData = mergeSort(fuelPriceData);
	const listOfLatitudes = getListOfLatitudes(sortedPriceData);
	let matchingLat;
	for (station of viableStations) {
		matchingLat = binarySearch(listOfLatitudes, station);
		// if (
		// 	matchingLat !== -1 &&
		// 	parseFloat(sortedPriceData[matchingLat].longitude).toFixed(3) ===
		// 		parseFloat(station.longitude).toFixed(3)
		// ) {
		// 	console.log("ALSKDJFLASJF");
		// 	station.price = sortedPriceData[matchingLat].price;
		// }
		if (matchingLat !== -1) {
			console.log(parseFloat(sortedPriceData[matchingLat].longitude));
			console.log(parseFloat(station.lng));
			station.price = sortedPriceData[matchingLat].price;
		}
	}
	return viableStations;
};

module.exports = getFuelPrices;
