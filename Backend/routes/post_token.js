module.exports = function(app, dbconn){
  // The parameters must be uid and token
    app.post('/update_token', function(req, res) {
        dbconn().then((db) => {
            // if document with argument id exists then update, otherwise return UID not found
            console.log(req.body);
            db.collection('volunteers').find({'id': parseInt(req.body.uid)}).toArray(function(err, items) {
                if (items.length > 0) {
                    db.collection('volunteers').update({id: parseInt(req.body.uid)},
                        {
                                    $set: {
                                        'token': req.body.token,
                                    },
                        }
                    );
                    res.send('Successfully updated token');
                } else {
                    res.send('Error: UID Not Found!');
                }
                db.close();
            });
            
        });
    });
}