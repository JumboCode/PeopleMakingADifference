module.exports = function(app, dbconn){
    app.get('/uid/:uid', function(req, res) {
        dbconn().then((db) => {
            result = db.collection('bowls').find({'volunteers.id': parseInt(req.params.uid)}, {'volunteers.$': 1}).toArray(function(err, items) {
                if (items.length > 0) {
                    res.send(items[0].volunteers[0]);
                } else {
                    res.status(400);
                    res.send('Error: UID Not Found!');
                }
                db.close();
            });
            
        });
    });
}
