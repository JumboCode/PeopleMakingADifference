module.exports = function(app){
	// The parameter must be name 'message'
    app.post('/update_message', function(req, res) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');

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
}