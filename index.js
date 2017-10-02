// Imports
var express = require("express");

// Inits
var app = express();

app.get(function(request, response){
        response.send("hello");
})

app.listen(5000);
