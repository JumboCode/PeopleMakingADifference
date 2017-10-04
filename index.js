// Imports
var express = require("express");

// Inits
var app = express();

app.get("/", function(request, response){
        response.send('[ { "id": 1, "name": "Tony Stark", "assignment": "Build Ironman suit to escape cave" }, { "id": 2, "name": "Darth Vader", "assignment": "Use the Force (For evil)" }, { "id": 3, "name": "Claire Underwood", "assignment": "Scheme" }, { "id": 4, "name": "Buffy the Vampire Slayer" "assignment": "Slay vampires" } ]');
})

app.listen(5000);

console.log("Listening on localhost:5000")
