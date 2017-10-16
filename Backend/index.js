var express = require('express');
var app = express();
var mongodb = require('mongodb');


if (process.argv[2] == "--local" || process.argv[2] == "-l") {
	var uri = 'mongodb://localhost:27017/pmd';
	console.log("Database set to local.");
} else if (process.argv[2] == "--prod" || process.argv[2] == "-p") {
	var uri = process.env.MONGODB_URI;
	console.log("Database set to production.");
} else {
	console.log("Defaulted database to local. Use option --prod if production needed.");
	var uri = 'mongodb://localhost:27017/pmd';
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get("/", function(req, res){
    mongodb.MongoClient.connect(uri, function(err, db){
		if (err) throw err;
		result = db.collection('volunteers').find().toArray(function(err, items){
			console.log(items);
			res.send(items);
		});
		db.close();
	});
});

app.get("/:uid", function(req, res){
	mongodb.MongoClient.connect(uri, function(err, db){
		if (err) throw err;
		console.log(req.params);
		result = db.collection('volunteers').find({id:parseInt(req.params.uid)}).toArray(function(err, items){
			if (items.length > 0){
				res.send(items);
			} else {
				res.send("Error: UID Not Found!");
			}
		});
		db.close();
	});
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
