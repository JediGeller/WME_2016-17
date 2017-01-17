//alert("Implement D3 and Leaflet stuff here ;)");

/**************************************************************************
****************************** D3.js ************************************
**************************************************************************/

var dataset = [];

//Source: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    //width = 550 - margin.left - margin.right,
    width = screen.width * 0.5 - margin.left - margin.right,
    height = 250 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#chart1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");




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

    data.forEach(function (d) {
        d.id = +d.id;
    });


    // Barchart 1
    // Scale the range of the data in the domains
    x.domain(data.map(function (d) { return d.name; }));
    y.domain([0, d3.max(data, function (d) { return d.id; })]);

    // append the rectangles for the bar chart
    svg.selectAll("#chart1")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.id); })
        .attr("height", function (d) { return height - y(d.id); });

    // add the x Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the y Axis
    svg.append("g")
        .call(d3.axisLeft(y));

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

    //var dataset = [5, 10, 13, 19, 21, 25, 22, 18, 15, 13, 11, 12, 15, 20, 18, 17, 16, 18, 23, 25];
    var data1 = properties;
    var data2 = properties;

    // Barchart 2
    //var svg = d3.select("#chart2")
    //            .append("svg")
    //            .attr("width", w)
    //            .attr("height", h);

    //svg.selectAll("rect")
    //   .data(dataset)
    //   .enter()
    //   .append("rect")
    //   .attr("x", function (d, i) {
    //       return i * (w / dataset.length);
    //   })
    //   .attr("y", function (d) {
    //       return h - (d * 4);
    //   })
    //   .attr("width", w / dataset.length - barPadding)
    //   .attr("height", function (d) {
    //       return d * 4;
    //   });

    //var selectedProperty;

    // Select-Box 1
    //Source: http://bl.ocks.org/jfreels/6734823
    var select = d3.select('#selectbox1')
      .append('select')
        .attr('class', 'select')
        .on('change', onchange1)

    var options = select
      .selectAll('option')
        .data(data1).enter()
        .append('option')
            .text(function (d) { return d; });

    function onchange1() {
        selectedProperty = d3.select('select').property('value');
        console.log(selectedProperty);
        //return selectedProperty1;
    };

    // Select-Box 2
    //Source: http://bl.ocks.org/jfreels/6734823
    var select = d3.select('#selectbox2')
      .append('select')
        .attr('class', 'select')
        .on('change', onchange2)

    var options = select
      .selectAll('option')
        .data(data2).enter()
        .append('option')
            .text(function (d) { return d; });

    function onchange2() {
        selectedProperty = d3.select('select').property('value');
        //console.log(selectedProperty);
        //return selectedProperty2;
    };

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
        L.marker([dataset[i].gps_lat, dataset[i].gps_long])
           .bindPopup(properties[0] + '<br> from: ' + dataset[i].name + '<br><br>' + dataset[i].id)
           .addTo(world_map);
    }
});