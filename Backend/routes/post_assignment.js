module.exports = function(app){
	// The parameters must be uid and assignment
    app.post('/update_assignment', function(req, res) {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
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
}