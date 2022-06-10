let autocomplete;
function initAutocomplete() {
	autocomplete = new google.maps.places.Autocomplete(document.getElementById("autocomplete"), {
		componentRestrictions: { country: "AU" },
		fields: ["geometry", "name"],
	});
	autocomplete.addListener("place_changed", onPlaceChanged);
}
function onPlaceChanged() {
	let place = autocomplete.getPlace();
	if (!place.geometry) {
		// User did not select a prediction; reset the input field
		document.getElementById("autocomplete").placeholder = "Enter a Place";
	} else {
		document.getElementById("details").innerHTML = place.name;
	}
}
