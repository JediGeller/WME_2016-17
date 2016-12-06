﻿//alert("No ajax calls implemented ;)");

$.ajax({
    type: "GET",
    url: "http://localhost:3000/items",
    async: true,
    dataType: "jsonp",
    contentType: 'application/json',
    success: function (data) {
        //$("#country_filter").append(data);
    }, error: function (jgXHR, text, err) {
        alert("Fehler: " + text + " " + err);
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:3000/items/:id",
    async: true,
    dataType: "jsonp",
    contentType: 'application/json',
    success: function (data) {
        $("#country_filter_id").append(data);
    }, error: function (jgXHR, text, err) {
        alert("Fehler: " + text + " " + err);
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:3000/items/:id1/:id2",
    async: true,
    dataType: "jsonp",
    contentType: 'application/json',
    success: function (data) {
        $("#country_filter_range").append(data);
    }, error: function (jgXHR, text, err) {
        alert("Fehler: " + text + " " + err);
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:3000/properties",
    async: true,
    dataType: "jsonp",
    contentType: 'application/json',
    success: function (data) {
        $("#prop_selection").append(data);
    }, error: function (jgXHR, text, err) {
        alert("Fehler: " + text + " " + err);
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:3000/properties/:num",
    async: true,
    dataType: "jsonp",
    contentType: 'application/json',
    success: function (data) {
        $("#prop_selection").append(data);
    }, error: function (jgXHR, text, err) {
        alert("Fehler: " + text + " " + err);
    }
});

$.ajax({
    type: "POST",
    url: "http://localhost:3000/items",
    async: true,
    dataType: "jsonp",
    data: json,
    contentType: 'text/html',
    success: function (data) {
        $("#country_add").append(data);
    }, error: function (jgXHR, text, err) {
        alert("Fehler: " + text + " " + err);
    }
});

$.ajax({
    type: "DELETE",
    url: "http://localhost:3000/items",
    async: true,
    dataType: "jsonp",
    contentType: 'text/html',
    success: function (data) {
        $("#country_delete").append(data);
    }, error: function (jgXHR, text, err) {
        alert("Fehler: " + text + " " + err);
    }
});

$.ajax({
    type: "DELETE",
    url: "http://localhost:3000/items/:id",
    async: true,
    dataType: "jsonp",
    contentType: 'text/html',
    success: function (data) {
        $("#country_delete_id").append(data);
    }, error: function (jgXHR, text, err) {
        alert("Fehler: " + text + " " + err);
    }
});