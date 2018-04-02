const mongodb = require('mongodb');
// var uri = process.env.MONGODB_URI;
const uri = 'mongodb://localhost:27017/pmd';
test = require('assert');

const seedData = [
    {
        name: "Example Science Bowl",
        id: "1234",
        exit_id: "4321",
        message: 'You guys are the best! Stay wholesome! <3',
        volunteers: [
            {
                id: 1,
                name: 'Tony Stark',
                assignment: 'Build Ironman suit to escape cave',
                location: 'Stark Tower',
                checkout: false,
                checkin: false,
                phone: 1234567890
            },
            {
                id: 2,
                name: 'Darth Vader',
                assignment: 'Use the Force (For evil)',
                location: 'The Death Star',
                checkout: false,
                checkin: false,
                phone: 1234567891
            },
            {
                id: 3,
                name: 'Claire Underwood',
                assignment: 'Scheme',
                location: 'Washington',
                checkout: false,
                checkin: false,
                phone: 1234567892
            },
            {
                id: 4,
                name: 'Buffy the Vampire Slayer',
                assignment: 'Slay vampires',
                location: 'Hellmouth',
                checkout: false,
                checkin: false,
                phone: 1234567893
            },
        ]
   },
   {
        name: "Another Example Bowl",
        id: "0000",
        exit_id: "0000",
        message: 'Socialism will win',
        volunteers: [
            {
                id: 5,
                name: 'Rowdy Roddy Piper',
                assignment: 'Star in the movie They Live',
                location: 'All out of bubble gum',
                checkout: false,
                checkin: false,
                phone: 1234567890
            },
            {
                id: 6,
                name: 'Hulk Hogan',
                assignment: 'Destroy Gawker Media',
                location: 'Probably Florida',
                checkout: false,
                checkin: false,
                phone: 1234567891
            },
            {
                id: 7,
                name: 'The Nature Boy Ric Flair',
                assignment: 'Wooo!',
                location: 'Limousine',
                checkout: false,
                checkin: false,
                phone: 1234567892
            },
            {
                id: 8,
                name: 'The Undertaker',
                assignment: 'Win the 2007 Royal Rumble for some reason',
                location: 'Texas',
                checkout: false,
                checkin: false,
                phone: 1234567893
            },
        ]
   }
 ];

mongodb.MongoClient.connect(uri, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established to', uri);

    // do some work here with the database.
    var data = db.collection('bowls');
    db.collection('bowls').insertMany(seedData, function(err, r){});

    //Close connection
    db.close();
  }
});
