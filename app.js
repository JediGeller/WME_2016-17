﻿// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!


/**************************************************************************
****************************** csv2json *********************************
**************************************************************************/

var json;

//Gibt csv daten hintereinander aus, speichert
var csvConverter = new Converter({});
var readStream = require("fs").createReadStream("public/world_data.csv"); //2 unterschiedliche csv Dateien vorhanden. Fragen welche und Verzeichnis!! 
var writeStream = require("fs").createWriteStream("public/world_data.json");
readStream.pipe(csvConverter).pipe(writeStream);

//Gibt csv Daten fast gut untereinander aus, in json Variable
var csvConverter = new Converter({});
csvConverter.fromFile("./world_data.csv", function (err, result) {
    json = result;
    console.log(json);

    //zur Formatierung:
    //in JSON String umwandeln
    /*var csvDaten = JSON.stringify
    ([
        { resultdata : result[0] },
        { resultdata : result[1] }
    ]);

    //in js String umwandeln
    csvDaten = JSON.parse(csvDaten);
    console.log(csvDaten);
    }); */
    close(); //Bei Abgabe löschen und console.log auskommentieren
});



/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

/*var http = require('http');

app.get('/*', function (req, res) {
    console.log('GET-Anfrage wurde entgegengenommen und wird bearbeitet!');
    res.sendFile(__dirname + '/index.html');
    //TODO
});

app.post('/*', function(req, res) { 
    //res.sendFile(__dirname + '/index.html');
	//TODO
});

app.delete('/*', function(req, res) { 
    //TODO
});
*/

// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});