const express = require('express');
const app = express();
const mongodb = require('mongodb');
const bodyParser = require('body-parser'); // module used to parse POST parameters
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

if (process.argv[2] == "--local" || process.argv[2] == "-l") {
	var uri = 'mongodb://localhost:27017/pmd';
	console.log("Database set to local.");
} else if (process.argv[2] == "--prod" || process.argv[2] == "-p") {
	var uri = process.env.MONGODB_URI;
	console.log("Database set to production.");
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

// CORS! Yes, really! For real!
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
  
let uri = '';
if (process.argv[2] == '--local' || process.argv[2] == '-l') {
    uri = 'mongodb://localhost:27017/pmd';
    console.log('Database set to local.');
} else if (process.argv[2] == '--prod' || process.argv[2] == '-p') {
    uri = process.env.MONGODB_URI;
    console.log('Database set to production.');
} else {
    console.log('Defaulted database to local. Use option --prod if production needed.');
    uri = 'mongodb://localhost:27017/pmd';
}

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    mongodb.MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        result = db.collection('volunteers').find().toArray(function(err, items) {
            res.send(items);
        });
        db.close();
    });
});


app.get('/uid/:uid', function(req, res) {
        mongodb.MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        result = db.collection('volunteers').find({id: parseInt(req.params.uid)}).toArray(function(err, items) {
            if (items.length > 0) {
                res.send(items);
            } else {
                res.send('Error: UID Not Found!');
            }
        });
        db.close();
    });
});

app.get('/get_message', function(req, res) {
  // if message exists return message otherwise return error string
  mongodb.MongoClient.connect(uri, function(err, db) {
  if (err) throw err;
      existenceCheck = db.collection('message').find().toArray(function(err, items) {
          if (items.length > 0) {
              message = items[items.length-1].message;
              res.send(String(message));
          } else {
              res.send('Error: No message in database.');
          }
      });
  });
});


// The parameters must be uid and location
app.post('/update_location', function(req, res) {
    mongodb.MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        // if document with argument id exists then update, otherwise return UID not found
        existenceCheck = db.collection('volunteers').find({'id': parseInt(req.body.uid)}).toArray(function(err, items) {
            if (items.length > 0) {
                db.collection('volunteers').update({id: parseInt(req.body.uid)},
                    {
                                $set: {
                                    'location': req.body.location,
                                },
                    });
                    res.send('Successfully updated location');
                } else {
                    res.send('Error: UID Not Found!');
                }
        });
    });
});


// The parameters must be uid and assignment
app.post('/update_assignment', function(req, res) {
    mongodb.MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
        // if document with argument id exists then update, otherwise return UID not found
        existenceCheck = db.collection('volunteers').find({'id': parseInt(req.body.uid)}).toArray(function(err, items) {
            if (items.length > 0) {
                db.collection('volunteers').update({id: parseInt(req.body.uid)},
                    {
                        $set: {
                            'assignment': req.body.assignment,
                        },
                    });
                    res.send('Successfully updated assignment');
                } else {
                    console.log('UID NOT FOUND');
                    res.send('Error: UID Not Found!');
                }
        });
    });
});


// The parameter must be name 'message'
app.post('/update_message', function(req, res) {
    mongodb.MongoClient.connect(uri, function(err, db) {
        if (err) {
            throw err;
        }
        const msg = req.body.message;
        if (/[\\/&;<(*)>$=]/.test( msg )) {
            res.send('Invalid input!\n');
        } else {
            coll = db.collection('message').find();
            if (coll.length > 0) {
                db.collection('message').update({'message': msg});
            } else {
                db.collection('message').insert({'message': msg});
            }
            res.send('Successfully created collection and updated message');
        }
    });
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
