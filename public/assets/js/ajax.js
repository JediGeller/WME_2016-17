alert("No ajax calls implemented ;)");

$.ajax({
    type: "GET",
    url: "http://localhost:3000/index.html",
    async: true,
    success: function (data) {
                //TODO
    }, error: function (jgXHR, text, err) {
                //TODO
    }
});

$.ajax({
    type: "POST",
    url: "http://localhost:3000/index.html",
    async: true,
    success: function (data) {
        //TODO
    }, error: function (jgXHR, text, err) {
        //TODO
    }
});

$.ajax({
    type: "DELETE",
    url: "http://localhost:3000/index.html",
    async: true,
    success: function (data) {
        //TODO
    }, error: function (jgXHR, text, err) {
        //TODO
    }
});