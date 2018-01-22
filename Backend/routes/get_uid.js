module.exports = function(app){
    app.get('/uid/:uid', function(req, res) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
}
