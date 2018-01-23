module.exports = function(app, dbconn){
	app.get('/', function(req, res) {
        dbconn().then((db) => {
            result = db.collection('volunteers').find().toArray(function(err, items) {
                res.send(items);
            });
            db.close();
        });
    });
}