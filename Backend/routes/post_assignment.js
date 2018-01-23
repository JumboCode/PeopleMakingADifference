module.exports = function(app, dbconn){
	// The parameters must be uid and assignment
    app.post('/update_assignment', function(req, res) {
        dbconn().then((db) => {
            // if document with argument id exists then update, otherwise return UID not found
            existenceCheck = db.collection('volunteers').find({'id': parseInt(req.body.uid)}).toArray(function(err, items) {
                if (items.length > 0) {
                    db.collection('volunteers').update({id: parseInt(req.body.uid)},
                        {
                            $set: {
                                'assignment': req.body.assignment,
                            },
                        }
                    );

                    res.send('Successfully updated assignment');

                } else {
                    console.error('UID NOT FOUND:', req.body.uid);
                    res.send('Error: A User With That ID Was Not Found!');
                }
            });
            db.close();
        });
    });
}