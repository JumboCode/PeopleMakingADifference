module.exports = function(app, dbconn){
    app.get('/get_message/:uid', function(req, res) {
        // if message exists for the event that the user is a member of, return the message, otherwise, an error
        dbconn().then((db) => {
            existenceCheck = db.collection('bowls').find(
                {
                    'volunteers.id': parseInt(req.params.uid)
                }
            ).toArray(function(err, items) {
                if (items.length > 0) {
                    message = items[items.length-1].message;
                    res.send(String(message));
                } else {
                    res.status(400);
                    res.send('Error: No message in database.');
                }
                db.close();
            });
            
        });
    });
}