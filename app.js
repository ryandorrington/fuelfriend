const express = require("express");
var axios = require("axios");
const polylineDecode = require("./polylineDecode");

const app = express();
const port = 3000;

var config = {
  method: "get",
  url: "https://maps.googleapis.com/maps/api/directions/json?origin=72+wimbledon+drive+kingsley+WA&destination=41+fernwood+square+padbury+WA&key=AIzaSyDSy-SjECHR-IUZy39a7N3N0kYO-XzDv68",
  headers: {},
};

app.get("/", (req, res) => {
  axios(config)
    .then(function (response) {
      console.log(
        JSON.stringify(response.data.routes[0].overview_polyline.points),
        polylineDecode(response.data.routes[0].overview_polyline.points)
      );
    })
    .catch(function (error) {
      console.log(error);
    });

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
