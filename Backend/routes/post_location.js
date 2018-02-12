module.exports = function(app, dbconn){
	// The parameters must be uid and location
    app.post('/update_location', function(req, res) {
        dbconn().then((db) => {
            // if document with argument id exists then update, otherwise return UID not found
            existenceCheck = db.collection('bowls').find({'volunteers.id': parseInt(req.body.uid)}).toArray(function(err, items) {
                if (items.length > 0) {
                    db.collection('bowls').update({'volunteers.id': parseInt(req.body.uid)},
                        {
                                    $set: {
                                        'volunteers.$.location': req.body.location,
                                    },
                        }
                    );
                    res.send('Successfully updated location');
                } else {
                    res.send('Error: UID Not Found!');
                }
                db.close();
            });
            
        });
    });
}