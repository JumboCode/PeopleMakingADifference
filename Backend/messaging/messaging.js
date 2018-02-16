const admin = require("firebase-admin"),
  serviceAccount = require("./demo-key.json"),
  mongodb = require('mongodb');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pmd-demo.firebaseio.com"
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

let payload = {
  notification: {
    title: "Cool notif",
    body: "💩💩💩💩💩💩💩💩💩"
  }
};

mongodb.MongoClient.connect(uri, (err, db) => {
  db.collection('volunteers').find({"token":{$exists: true}}).toArray((err, items) => {
    for (let item of items) {
      admin.messaging().sendToDevice(item['token'], payload)
      .then((response) => {
        console.log("sent message", response);

      })
      .catch((err) => {
        console.error(err);
      });
    } 
    db.close();
  });
});