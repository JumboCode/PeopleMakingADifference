var express = require('express');
var app = express();
var mongodb = require('mongodb');
var bodyParser = require('body-parser'); // module used to parse POST parameters
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


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

app.get("/uid/:uid", function(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        mongodb.MongoClient.connect(uri, function(err, db){
		if (err) throw err;
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

app.get("/", function(req, res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    mongodb.MongoClient.connect(uri, function(err, db){
		if (err) throw err;
		result = db.collection('volunteers').find().toArray(function(err, items){
			res.send(items);
		});
		db.close();
	});
});

app.get("/get_message", function(req, res){
  // if message exists return message otherwise return error string
  mongodb.MongoClient.connect(uri, function(err, db){
  if (err) throw err;
      existence_check = db.collection('message').find().toArray(function(err, items){
          if (items.length > 0) {
              message = items[items.length-1].message;
              res.send(String(message));
          }
          else {
              res.send("Error: No message in database.");
          }
      })
  });
});



// The parameters must be uid and location
app.post("/update_location", function(req, res){
        console.log("location updated")
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	mongodb.MongoClient.connect(uri, function(err, db){
        console.log("connected to db")
		if (err) throw err;
		// if document with argument id exists then update, otherwise return UID not found
		existence_check = db.collection('volunteers').find({"id" : parseInt(req.body.uid)}).toArray(function(err, items){
			if (items.length > 0){
				db.collection('volunteers').update({id:parseInt(req.body.uid)},
					{
		    			$set: {
		    					"location": req.body.location
		   	 				}
		  			})
					res.send("Successfully updated location");
				}
			else {
					res.send("Error: UID Not Found2!");
				}
		});
	});
});


// The parameters must be uid and assignment
app.post("/update_assignment", function(req, res){
        console.log("assignment updated")
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	mongodb.MongoClient.connect(uri, function(err, db){
        console.log("connected to db")
        console.log(req.body.uid)
		if (err) throw err;
		// if document with argument id exists then update, otherwise return UID not found
		existence_check = db.collection('volunteers').find({"id" : parseInt(req.body.uid)}).toArray(function(err, items){
			if (items.length > 0){
				db.collection('volunteers').update({id:parseInt(req.body.uid)},
					{
		    			$set: {
		    					"assignment": req.body.assignment
		   	 				}
		  			})
					res.send("Successfully updated assignment");
				}
			else {
                    console.log("UID NOT FOUND")
					res.send("Error: UID Not Found!");
				}
		});
	});
});


// The parameter must be name 'message'
app.post("/update_message", function(req, res){
       	res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	
	mongodb.MongoClient.connect(uri, function(err, db){
		if (err)
            throw err;

        var msg = req.body.message;
        if (/[\\/&;<(*)>$=]/.test( msg )) {
        	res.send('Invalid input!\n');
        } else {
        	coll = db.collection('message').find();
        	if (coll.length > 0){
        		db.collection('message').update({'message':msg});
        	} else {
        		db.collection('message').insert({'message':msg});
        	}
			res.send("Successfully created collection and updated message");
        }
	});
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
