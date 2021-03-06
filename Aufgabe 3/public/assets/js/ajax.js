﻿//alert("No ajax calls implemented ;)");
jQuery.support.cors = true;
var $ = require('jquery');
$.ajax({
    type: "GET",
    url: "http://localhost:3000/items",
    async: true,
    dataType: "jsonp",
    contentType: "application/json; charset=utf-8",
    success: function (data) {
        $('#add_submit').click(function (e) {
            e.preventDefault();
            var trHTML = '';
            var id = $(data).find('id').val();
            $.each(data, function (id, item) {
                trHTML += '<tr><td>' + data.id[i] + '</td><td>' + data.name[i] + '</td><td>' + data.birthrate[i] + '</td></tr>';
            });
            $("#table_body").append(trHTML);
            //$("#country_filter").append(data);
        });
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
      /*  $("#add_submit").click(function () {
            
        });
        $("#country_filter_id").append(data);*/
    }, error: function (jgXHR, text, err) {
        //alert("Fehler: " + text + " " + err);
    }
});

$.ajax({
    type: "GET",
    url: "http://localhost:3000/items/:id1/:id2",
    async: true,
    dataType: "jsonp",
    contentType: 'application/json',
    success: function (data) {
       // $("#country_filter_range").append(data);
    }, error: function (jgXHR, text, err) {
        //alert("Fehler: " + text + " " + err);
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
        //alert("Fehler: " + text + " " + err);
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
        //alert("Fehler: " + text + " " + err);
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