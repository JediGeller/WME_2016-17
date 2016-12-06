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
var readStream = require("fs").createReadStream("./world_data.csv"); //2 unterschiedliche csv Dateien vorhanden. Fragen welche und Verzeichnis!! 
var writeStream = require("fs").createWriteStream("./world_data.json");
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

/*  Anmerkungen:
Wenn die response nicht als JSON String gefordert war, res.end(JSON.stringify(var)); --> res.end(var);      :)
Da nicht explizit gefordert: IDs oder num's mit 0 wurden korrigiert, sodass json[0] die ID 1 hat usw. Wenn nach IDs mit 0 gesucht wird, erscheint auch ein Fehler.
*/

//GET Calls
//gibt alle items zurück
app.get('/items', function (req, res) {
    var allitems = json;
    //console.log(allitems);
    res.end(JSON.stringify(allitems));
    //res.json(allitems);
});

//gibt item mit bestimmter ID zurück
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

//gibt items mit den IDs im gesuchten Intervall zurück
app.get('/items/:id1/:id2', function (req, res) {
    var id1 = --req.params.id1;
    var id2 = --req.params.id2;

    //Fehler
    if (id1 > json.length || id2 > json.length || id1 < 0 || id2 < 0) {
        //console.log("Range not possible.");
        res.end("Range not possible.");
    }
    else {
        if (id1 == id2) {
            var pickeditem = json[--req.params.id1]
            res.end(JSON.stringify(pickeditem));
        }
        //von klein nach groß
        if (id1 > id2) {
            var pickeditem2 = new Array();
            for (i = id2; i <= id1; i++) {
                pickeditem2.push(json[req.params.id2]);
                req.params.id2++;
            }
            res.end(JSON.stringify(pickeditem2));
        }
        //von klein nach groß
        if (id1 < id2) {
            var pickeditem1 = new Array();
            for (i = id1; i <= id2; i++) {
                pickeditem1.push(json[req.params.id1]);
                req.params.id1++;
            }
            res.end(JSON.stringify(pickeditem1));
        }
        else {
            res.end("Range not possible.");
        };
    }
});

//gibt alle Properties zurück
app.get('/properties', function (req, res) {
    var p = json[0];    //vom ersten Objekt
    var allproperties = new Array();
    for (var property in p) {
        allproperties.push(property)
        }
    //console.log(allproperties);
    res.end(JSON.stringify(allproperties));
});

//gibt bestimmte Property zurück (num-te Property)
app.get('/properties/:num', function (req, res) {
    var num = req.params.num;
    var p = json[0];    //vom ersten Objekt
    var allproperties = new Array();
    for (var property in p) {
        allproperties.push(property)    //dem Array hinzufügen
    }

    //Fehler
    if (num > allproperties.length || num <=0 ) {
        //console.log("No such property available.");
        res.end("No such property available.");
    }
    else {
        allproperties = allproperties[--num];
        //console.log(allproperties);
        res.end(JSON.stringify(allproperties));
    }
});

//POST Calls
//fügt neues Land mit 2 Properties hinzu, sucht nicht nach Lücken!
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
        "birth rate per 1000" : birthrateper1000,
        "cell phones per 100": cellphonesper100
    }

    //Hinzufügen in Array an Stelle id
    json.splice(id, 0, newItem);
    //console.log(json);
    res.end("Added country " + name + " to list!");
});

//DELETE Calls
//löscht item, welches an letzter Stelle steht
app.delete('/items', function (req, res) {
    var name = req.params.name;
    var id = json.length;

    //TODO Namen bekommen an Stelle id
    // Ansatz
    //name = json[req.params.id + name];

    //console.log(json);
    //console.log("Deleted last country: " + name + "!");
    res.end("Deleted last country: " + name + "!");
});

//löscht item mit bestimmter ID
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
        //console.log("Item " + ++id + " deleted successfully.");
        res.end("Item " + ++id + " deleted successfully.");
    }
});


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});