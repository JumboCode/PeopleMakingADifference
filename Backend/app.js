var mongodb = require('mongodb');
//var uri = process.env.MONGODB_URI;
var uri = 'mongodb://localhost:27017/pmd';
test = require('assert');


var seedData = [
	{
		id: 1,
		name: 'Tony Stark',
		assignment: 'Build Ironman suit to escape cave',
                location: 'Stark Tower'
	},
	{
		id: 2,
		name: 'Darth Vader',
		assignment: 'Use the Force (For evil)',
                location: 'The Death Star'
	},
    {
    	id: 3,
    	name: 'Claire Underwood',
    	assignment: 'Scheme',
        location: "Washington"
    },
    {
    	id: 4,
    	name: 'Buffy the Vampire Slayer',
    	assignment: 'Slay vampires',
        location: "Hellmouth"
    }
 ];


// console.log(uri);

// mongodb.MongoClient.connect(uri, function (err, db) {
//   if (err) {
//     console.log('Unable to connect to the mongoDB server. Error:', err);
//   } else {
//     console.log('Connection established to', uri);

//     // do some work here with the database.
//     var data = db.collection('volunteers');
// 	db.collection('volunteers').insertMany(seedData, function(err, r){
// 		// test.equal(null, err);
// 		// test.equal(5, r.insertedCount);
// 	});

//     //Close connection
//     db.close();
//   }
// });
