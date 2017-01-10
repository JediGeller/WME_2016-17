//alert("Implement D3 and Leaflet stuff here ;)");

//Width and height
var w = 500;
var h = 100;
var barPadding = 1;

d3.csv("./world_data.csv", function (dataset) {
    return {
        id: dataset.id,
        name: dataset.name
        };
    //dataset = data.map(function (d) { return [+d["name"], +d["id"]]; });
    console.log(dataset);
});

var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
//var dataset = jsonObject;
//Create first chart
var svg = d3.select("#chart1")
            .append("svg")
            .attr("width", w)
            .attr("height", h);

svg.selectAll("rect")
   .data(dataset)
   .enter()
   .append("rect")
   .attr("x", function (d, i) {
       return i * (w / dataset.length);
   })
   .attr("y", function (d) {
       return h - (d * 4);
   })
   .attr("width", w / dataset.length - barPadding)
   .attr("height", function (d) {
       return d * 4;
   });

//Maperstellung
var world_map = L.map('mapid').setView([51.505, -0.09], 2);
//Source: http://leafletjs.com/
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | '
}).addTo(world_map);

//Bsp-Marker
L.marker([51.5, -0.09]).addTo(world_map)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .openPopup();
/*
//Funktioniert noch nicht
//Marker für jedes Land
for (var i = 0; i < jsonObject.length; ++i) {
    L.marker([jsonObject[i].gps_lat, jsonObject[i].gps_long])
       .bindPopup('" target="_blank">' + jsonObject[i].name)
       .addTo(world_map);
} */