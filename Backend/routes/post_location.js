module.exports = function(app, dbconn){
	// The parameters must be uid and location
    app.post('/update_location', function(req, res) {
        dbconn().then((db) => {
            if (err) throw err;
            // if document with argument id exists then update, otherwise return UID not found
            existenceCheck = db.collection('volunteers').find({'id': parseInt(req.body.uid)}).toArray(function(err, items) {
                if (items.length > 0) {
                    db.collection('volunteers').update({id: parseInt(req.body.uid)},
                        {
                                    $set: {
                                        'location': req.body.location,
                                    },
                        }
                    );
                    res.send('Successfully updated location');
                } else {
                    res.send('Error: UID Not Found!');
                }
            });
            db.close();
        });
    });
}