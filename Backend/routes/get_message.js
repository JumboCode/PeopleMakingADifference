module.exports = function(app){
    app.get('/get_message', function(req, res) {
        // if message exists return message otherwise return error string
        mongodb.MongoClient.connect(uri, function(err, db) {
        if (err) throw err;
            existenceCheck = db.collection('message').find().toArray(function(err, items) {
                if (items.length > 0) {
                    message = items[items.length-1].message;
                    res.send(String(message));
                } else {
                    res.send('Error: No message in database.');
                }
            });
        });
    });
}