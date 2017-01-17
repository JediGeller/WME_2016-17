//alert("Implement D3 and Leaflet stuff here ;)");

/**************************************************************************
****************************** D3.js ************************************
**************************************************************************/

var dataset = [];

//Source: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4   bis csv parsing
//Größe und Abstände festlegen
var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    width = screen.width * 0.5 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var barchart1 = d3.select("#chart1").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

var barchart2 = d3.select("#chart2").append("svg")
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
        d.birth_rate_per_1000 = +d.birth_rate_per_1000;
        d.cell_phones_per_100 = +d.cell_phones_per_100;
        d.children_per_woman = +d.children_per_woman;
        d.electricity_consumption_per_capita = +d.electricity_consumption_per_capita;
        d.gdp_per_capita = +d.gdp_per_capita;
        d.gdp_per_capita_growth = +d.gdp_per_capita_growth;
        d.inflation_annual = +d.inflation_annual;
        d.internet_user_per_100 = +d.internet_user_per_100;
        d.life_expectancy = +d.life_expectancy;
        d.military_expenditure_percent_of_gdp = +d.military_expenditure_percent_of_gdp;
    });


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


    // Barchart 1
    //Source: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
    //Daten für die Achsen festlegen und skalieren
    x.domain(data.map(function (d) { return d.name; }));
    y.domain([0, d3.max(data, function (d) { return d.id; })]);

    //Rechteckige Stufen für das Diagramm (rect)
    barchart1.selectAll("#chart1")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.id); })
        .attr("height", function (d) { return height - y(d.id); })
        .attr("fill", "grey");

    //X-Achse (unten)
    barchart1.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //Y-Achse (links)
    barchart1.append("g")
        .call(d3.axisLeft(y));


    // Barchart 2
    //Source: https://bl.ocks.org/d3noob/bdf28027e0ce70bd132edc64f1dd7ea4
    //Daten für die Achsen festlegen und skalieren
    x.domain(data.map(function (d) { return d.name; }));
    y.domain([0, d3.max(data, function (d) { return d.life_expectancy; })]);

    //Rechteckige Stufen für das Diagramm (rect)
    barchart2.selectAll("#chart2")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) { return x(d.name); })
        .attr("width", x.bandwidth())
        .attr("y", function (d) { return y(d.life_expectancy); })
        .attr("height", function (d) { return height - y(d.life_expectancy); })
        .attr("fill", "grey");

    //X-Achse (unten)
    barchart2.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    //Y-Achse (links)
    barchart2.append("g")
        .call(d3.axisLeft(y));


    var data1 = properties;
    var data2 = properties;

    var selectedProperty = properties[0];

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

    function onchange() {
        selectedProperty = d3.select('select').property('value');
        console.log(selectedProperty);
        //return selectedProperty;
    };

    /**************************************************************************
    ****************************** Leaflet **********************************
    **************************************************************************/

    //Maperstellung - View on Dresden
    var world_map = L.map('osmap').setView([51.0504088, 13.7372621], 2);
    //Source: http://leafletjs.com/
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
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