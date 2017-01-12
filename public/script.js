//alert("Implement D3 and Leaflet stuff here ;)");

//$.get("items", function (data) {
//    jsonObject = data;
//    console.log(data);
//});


/**************************************************************************
****************************** D3.js ************************************
**************************************************************************/

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
var data1 = ["Option 1", "Option 2"];
var data2 = ["Option 2", "Option 1"];
//var dataset = jsonObject;

// Barchart 1
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

// Barchart 2
var svg = d3.select("#chart2")
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

// Select-Box 1
//Source: http://bl.ocks.org/jfreels/6734823
var select = d3.select('#selectbox1')
  .append('select')
  	.attr('class', 'select')
    .on('change', onchange)

var options = select
  .selectAll('option')
	.data(data1).enter()
	.append('option')
		.text(function (d) { return d; });

// Select-Box 2
//Source: http://bl.ocks.org/jfreels/6734823
var select = d3.select('#selectbox2')
  .append('select')
  	.attr('class', 'select')
    .on('change', onchange)

var options = select
  .selectAll('option')
	.data(data2).enter()
	.append('option')
		.text(function (d) { return d; });

/**************************************************************************
****************************** Leaflet **********************************
**************************************************************************/

//Maperstellung - View on Dresden
var world_map = L.map('osmap').setView([51.0504088, 13.7372621], 2);
//Source: http://leafletjs.com/
L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | '
}).addTo(world_map);

//Bsp-Marker
L.marker([51.0504088, 13.7372621]).addTo(world_map)
    .bindPopup('Dresden!!!!!!')
    .openPopup();

//var gps_lat = jsonObject["gps_lat"];
//var gps_long = jsonObject["gps_long"];
//Funktioniert noch nicht
//Marker für jedes Land
//for (var i = 0; i < jsonObject.length; ++i) {
//    L.marker([jsonObject[i].gps_lat, jsonObject[i].gps_long])
//       .bindPopup('" target="_blank">' + jsonObject[i].name)
//       .addTo(world_map);
//} 