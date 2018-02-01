const mongodb = require('mongodb');
// var uri = process.env.MONGODB_URI;
const uri = 'mongodb://localhost:27017/pmd';
test = require('assert');

const seedData = [
    {
        id: 1,
        name: 'Tony Stark',
        assignment: 'Build Ironman suit to escape cave',
        location: 'Stark Tower',
        checkout: false,
    },
    {
        id: 2,
        name: 'Darth Vader',
        assignment: 'Use the Force (For evil)',
        location: 'The Death Star',
        checkout: false,
    },
    {
        id: 3,
        name: 'Claire Underwood',
        assignment: 'Scheme',
        location: 'Washington',
        checkout: false,
    },
    {
        id: 4,
        name: 'Buffy the Vampire Slayer',
        assignment: 'Slay vampires',
        location: 'Hellmouth',
        checkout: false,
    },
 ];

 const messageSeedData = [
     {
        message: 'You guys are the best! Stay wholesome! <3'
     }]

mongodb.MongoClient.connect(uri, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', uri);

    // do some work here with the database.
    var data = db.collection('volunteers');
    db.collection('volunteers').insertMany(seedData, function(err, r){});

    var messageData = db.collection('message');
    db.collection('message').insert(messageSeedData, function(err, r){});
    //Close connection
    db.close();
  }
});
