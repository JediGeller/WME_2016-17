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
//var fs = require('fs');

//GET Calls
app.get('/items', function (req, res) {
    var allitems = json;
    //console.log(allitems);
    res.end(JSON.stringify(allitems));
    //res.json(allitems);
});

app.get('/items/:id', function (req, res) {
    var id = req.params.id;

    //Fehler
    if (id > json.length || id <= 0) {
        //console.log("No such id " + id + " in database.");
        res.end("No such id " + id + " in database.");
    }
    else {
        var pickeditem = json[--req.params.id]
        //console.log(pickeditem);
        res.end(JSON.stringify(pickeditem));
    }
});

//TODO
app.get('/items/:id1/:id2', function (req, res) {
    var id1 = req.params.id1;
    var id2 = req.params.id2;
    //Fehler
    if (id1 > json.length || id2 > json.length || id1 <= 0 || id2 <=0) {
        //console.log("Range not possible.");
        res.end("Range not possible.");
    }
    else {
        if (id1 = id2) {
            var pickeditem = json[--req.params.id]
            res.end(JSON.stringify(pickeditem));
        }
        if (id1 > id2) {

        }
        if (id1 < id2) {
            for (id1 <= id2; id1 < id2; id1++) {
                var pickeditem1 = json[--req.params.id1]
                //var pickeditem2 = json[--req.params.id2]
                console.log(pickeditem1);
                //console.log(pickeditem2);
                res.end(JSON.stringify(pickeditem1));
                //res.end("Ihre gesuchte ID: " + JSON.stringify(pickeditem2));
            };
        }
        else { res.end("Range not possible."); };
    }
});

//TODO
app.get('/properties', function (req, res) {
    json = JSON.parse(json);
    var allproperties = json["properties"];
    allproperties = JSON.stringify(allproperties);
    res.end(JSON.stringify(allproperties));

});

//TODO
app.get('/properties/:num', function (req, res) {
    //Fehler
    //console.log("No such property available.");
    //res.end("No such property available.");
});

//POST Calls
app.post('/items', function (req, res) {    //form action="..." setzen??
    //festlegen der Parameter auf der Website, ID automatisch um 1 erhöhen
    var id = json.length + 1;
    var name = req.body.country_name;
    var birthrateper1000 = req.body.country_birth;
    var cellphonesper100 = req.body.country_cellphone;

    //Vorlage für neues Land
    var newItem = {
        id: id,
        name: name,
        birth_rate_per_1000: birthrateper1000,
        cell_phones_per_100: cellphonesper100
    }

    //Hinzufügen in Array an Stelle id
    json.splice(id, 0, newItem);
    //console.log(json);
    res.end("Added country " + name + " to list!");
});

//DELETE Calls
app.delete('/items', function (req, res) {
    var name = req.params.name;
    var id = json.length;
    //get.name?? - Name an der Stelle bekommen, wie?
    json.splice(--id, 1);
    console.log("Deleted last country: " + name + "!");
    res.end("Deleted last country: " + name + "!");
    res.end(JSON.stringify(json));
});

app.delete('/items/:id', function (req, res) {
    var id = req.params.id;
    //Fehler
    if (id > json.length || id <= 0) {
        //console.log("No such id " + id + " in database.");
        res.end("No such id " + id + " in database.");
    }
    else {
        //delete json[--req.params.id]
        json.splice(--id, 1);
        //console.log(json);
        console.log("Item " + ++id + " deleted successfully.");
        res.end(JSON.stringify(json));
    }
});


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});