// DO NOT CHANGE!
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
app.use(bodyParser.urlencoded({extended: true}));

//Gibt csv daten hintereinander aus, speichert
var csvConverter = new Converter({});
var readStream = require("fs").createReadStream("public/world_data.csv"); //2 unterschiedliche csv Dateien vorhanden. Fragen welche und Verzeichnis!! 
var writeStream = require("fs").createWriteStream("public/world_data.json");
readStream.pipe(csvConverter).pipe(writeStream);

//Gibt csv Daten fast gut untereinander aus, in json Variable
var csvConverter = new Converter({});
csvConverter.fromFile("./world_data.csv", function (err, result) {
    json = result;  //Speicherung in globaler Variable json
    console.log(json);
    console.log("json wrote successfully!");

    //Formatierung
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
    return json;
});



/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

//var http = require('http');
var fs = require('fs');
/*
var country = {
    id: req.body.id,
    name: req.body.name,
    birth_rate_per_1000 : req.body.birthrate
};
*/
//GET Calls
app.get('/items', function (req, res) {
    //fs.readFile(__dirname + "/" + "world_data.json", 'utf8', function (err, data) {
    //items = JSON.parse(data);
    //var allitems = items["id" + req.params.id]
    var allitems = json;
    console.log(allitems);
    //res.end(JSON.stringify(allitems));
    res.json(allitems);
    //res.sendFile(__dirname + '/index.html');
});

app.get('/items/:id', function (req, res) {
    var id = req.params.id;
    //Fehler
    if (id > 25 || id <= 0) {   //vorübergehend 24 als max
        console.log("No such id " + id + " in database.");
    }
    else {
        var pickeditem = json[--req.params.id]
        console.log(pickeditem);
        res.end("Ihre gesuchte ID: " + JSON.stringify(pickeditem));
    }
});

//TODO
app.get('/items/:id1/:id2', function (req, res) {
    var id1 = req.params.id1;
    var id2 = req.params.id2;
    //Fehler
    //console.log("Range not possible.");

    for (id1 <= id2; id1 < id2; id1++){
        var pickeditem1 = json[--req.params.id1]
        //var pickeditem2 = json[--req.params.id2]
        console.log(pickeditem1);
        //console.log(pickeditem2);
        res.end("Ihre gesuchte ID: " + JSON.stringify(pickeditem1));
        //res.end("Ihre gesuchte ID: " + JSON.stringify(pickeditem2));
    };

});

app.get('/properties', function (req, res) {
    var allproperties = json[req];
    res.end(JSON.stringify(allproperties));
});

app.get('/properties/num', function (req, res) {
    //Fehler
    //console.log("No such property available.");
});

//POST Calls
app.post('/items', function(req, res) { 
    var itemID = req.body.id;
    res.send(itemID);
    var newcountry = json;
    res.end(JSON.stringify(newcountry));
    console.log("Added country {name} to list!");
    //console.log(json);
});

//DELETE Calls
app.delete('/items', function(req, res) { 
    console.log("Deleted last country: {name}!");
});

app.delete('/items/id', function (req, res) {
    console.log("Item {id} deleted successfully");

    //Fehler
    //console.log("No such id {id} in database"):
});


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});