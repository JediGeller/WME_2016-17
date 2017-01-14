//alert("Implement D3 and Leaflet stuff here ;)");

/**************************************************************************
****************************** D3.js ************************************
**************************************************************************/

var dataset = [];

//csv parsing
d3.csv("world_data.csv", function (data) {
    //console.log(data);
    //properties
    var properties = Object.keys(data[0]);
    console.log(properties);
    dataset = data;
    //console.log(dataset);
    for (var i = data.length - 1; i >= 0; i--) {
        var currentId = data[i].id;
        var currentgps_lat = data[i].gps_lat;
        var currentgps_long = data[i].gps_long;
        var currentname = data[i].name;
    }


    //alte Funktion
    //d3.csv("world_data.csv", function (csv) {
    //    //dataset = csv;
    //    console.log(csv);
    //    csv.forEach(function (d, i) {
    //        d.gps_lat = +d.gps_lat;
    //        d.gps_long = +d.gps_long;
    //        dataset.push(d);
    //    });
    //});

    //Width and height
    var w = 500;
    var h = 100;
    var barPadding = 1;

    //var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
    var data1 = properties;
    var data2 = properties;

    // Barchart 1

    //var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    //var y = d3.scale.linear().range([height, 0]);

    //var xAxis = d3.svg.axis()
    //    .scale(x)
    //    .orient("bottom")
    //    .tickFormat(d3.time.format("%Y-%m"));

    //var yAxis = d3.svg.axis()
    //    .scale(y)
    //    .orient("left")
    //    .ticks(10);

    //var convert = {
    //    x1: d3.scale.ordinal(),
    //    y1: d3.scale.linear()
    //};
    //// Define your axis
    //var axis = {
    //    x1: d3.svg.axis().orient('bottom'),
    //    y1: d3.svg.axis().orient('left')
    //};

    //// Define the conversion function for the axis points
    //axis.x1.scale(convert.x1);
    //axis.y1.scale(convert.y1);

    var svg = d3.select("#chart1")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    svg.selectAll("rect")
       .data(dataset)
       .enter()
       .append("rect")
       .attr("x", function (d, i) {
           return i * (dataset.name);
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

    function onchange() {
        var selectedProperty = d3.select('select').property('value');
        return selectedProperty;
    };

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

    //Marker für jedes Land
    for (var i = 0; i < dataset.length; ++i) {
        var selectedProperty;
        onchange();
        L.marker([dataset[i].gps_lat, dataset[i].gps_long])
           .bindPopup(selectedProperty + "br/" + dataset[i].name)
           .addTo(world_map);
    }
});