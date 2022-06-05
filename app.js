const express = require("express");
const getNearbyStations = require("./getNearbyStations");

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
	stations = await getNearbyStations();

	console.log(stations);
	res.send("hello world");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
