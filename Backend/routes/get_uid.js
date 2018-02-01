module.exports = function(app, dbconn){
    app.get('/uid/:uid', function(req, res) {
        dbconn().then((db) => {
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
