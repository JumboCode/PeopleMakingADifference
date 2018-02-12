module.exports = function(app, dbconn){
    app.get('/get_message', function(req, res) {
        // if message exists return message otherwise return error string
        dbconn().then((db) => {
            existenceCheck = db.collection('bowls').find({active: true}).toArray(function(err, items) {
                if (items.length > 0) {
                    message = items[items.length-1].message;
                    res.send(String(message));
                } else {
                    res.send('Error: No message in database.');
                }
                db.close();
            });
            
        });
    });
}