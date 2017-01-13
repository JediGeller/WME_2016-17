﻿//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

var $ = require('jQuery');

var d3 = require('d3'),
    jsdom = require('jsdom');

//var document = jsdom.jsdom(),
 //   svg = d3.select(document.body).append("svg");

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

/**************************************************************************
****************************** csv2json *********************************
**************************************************************************/

var jsonObject;

//Converter Class -> read csv file and create jsonObj
var converter = new Converter({
    delimiter: ";"
});
var jsonStruct_countrys = "";


//d3.csv("world_data.csv", function (data) {
//    //jsonObject = data;
//    console.log(data);
//    //return jsonObject;
//});

//csv-Datei einlesen und in json Varriable speichern
converter.fromFile("./world_data.csv", function (err, result) {
    jsonObject = result;  //Speicherung in globaler Variable jsonObject
    //console.log(jsonObject);
    console.log("json wrote successfully!");

    return jsonObject;
});

//end_parsed will be emitted once parsing finished
converter.on("end_parsed", function (jsonObject) {
   jsonStruct_countrys = jsonObject;
   //updateJSONFile();
});

/**************************************************************************
****************************** handle HTTP GET req ******************
**************************************************************************/
// GET all properties
app.get('/properties', function (req, res) {
    var keys = Object.keys(jsonStruct_countrys[0]);
    res.send( keys );
});

//gibt alle items zurück
app.get('/items', function (req, res) {
    var allitems = jsonObject;
    //console.log(allitems);
    res.end(JSON.stringify(allitems));
    //res.json(allitems);
});

// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});