module.exports = function(app){
	app.get('/', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        mongodb.MongoClient.connect(uri, function(err, db) {
            if (err) throw err;
            result = db.collection('volunteers').find().toArray(function(err, items) {
                res.send(items);
            });
            db.close();
        });
    });
}