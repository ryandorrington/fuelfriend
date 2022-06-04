const express = require("express");
var axios = require("axios");
const polylineDecode = require("./polylineDecode");

const app = express();
const port = 3000;

// let latLongData;
// const directionsResponseExample = () => {
//   var config = {
//     method: "get",
//     url: "https://maps.googleapis.com/maps/api/directions/json?origin=72+wimbledon+drive+kingsley+WA&destination=41+fernwood+square+padbury+WA&key=AIzaSyDSy-SjECHR-IUZy39a7N3N0kYO-XzDv68",
//     headers: {},
//   };

//   axios(config)
//     .then(function (response) {
//       latLongData = polylineDecode(
//         response.data.routes[0].overview_polyline.points
//       );
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

const directionsResponseExample = async () => {
  var config = {
    method: "get",
    url: "https://maps.googleapis.com/maps/api/directions/json?origin=72+wimbledon+drive+kingsley+WA&destination=41+fernwood+square+padbury+WA&key=AIzaSyDSy-SjECHR-IUZy39a7N3N0kYO-XzDv68",
    headers: {},
  };

  response = await axios(config);

  return polylineDecode(response.data.routes[0].overview_polyline.points);
};

directionsResponseExample().then((data) => {
  console.log(data);
});
// const getThreePointsAlongRoute = async () => {
//   latLongData = await directionsResponseExample().then((latLongData) => {
//     return latLongData[0];
//   });
// };

// console.log(getThreePointsAlongRoute());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
