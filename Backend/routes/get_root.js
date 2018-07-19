const messaging = require('../messaging/messaging.js');
const admin = require("firebase-admin");
module.exports = function(app, dbconn) {
	app.get('/', function(req, res) {
				let token = req.query.token ? req.query.token : '';
				admin.auth().verifyIdToken(token).then(function(decodedToken) {
    			let uid = decodedToken.uid;
    			console.log(`Current User ID: ${uid}`);
					dbconn().then((db) => {
							result = db.collection('bowls').find().toArray(function(err, items) {
									res.send(items);
									db.close();
							});
					});
				}).catch(function(error) {
					res.send("Error: Please log in");
					console.log("Auth Error: " + error);
				});
	});
}
