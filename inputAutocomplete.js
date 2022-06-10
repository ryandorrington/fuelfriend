let originAutocomplete;
let destinationAutocomplete;

function initAutocomplete() {
	originAutocomplete = new google.maps.places.Autocomplete(document.getElementById("origin"), {
		componentRestrictions: { country: "AU" },
		fields: ["geometry", "name"],
	});
	destinationAutocomplete = new google.maps.places.Autocomplete(document.getElementById("destination"), {
		componentRestrictions: { country: "AU" },
		fields: ["geometry", "name"],
	});
	originAutocomplete.addListener("place_changed", onOriginChanged);
	destinationAutocomplete.addListener("place_changed", onDestinationChanged);
}

function onOriginChanged() {
	let place = originAutocomplete.getPlace();
	if (!place.geometry) {
		// User did not select a prediction; reset the input field
		document.getElementById("origin").placeholder = "Enter a Place";
	} else {
		document.getElementById("originDetails").innerHTML = place.name;
	}
}

function onDestinationChanged() {
	let place = destinationAutocomplete.getPlace();
	if (!place.geometry) {
		// User did not select a prediction; reset the input field
		document.getElementById("destination").placeholder = "Enter a Place";
	} else {
		document.getElementById("destinationDetails").innerHTML = place.name;
	}
}
