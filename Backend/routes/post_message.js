module.exports = function(app, dbconn){
	// The parameter must be name 'message'
    app.post('/update_message', function(req, res) {
        dbconn().then((db) => {
            if (err) throw err;
            const msg = req.body.message;
            if (/[\\/&;<(*)>$=]/.test( msg )) {
                res.send('Invalid input!\n');
            } else {
                coll = db.collection('message').find();
                if (coll.length > 0) {
                    db.collection('message').update({'message': msg});
                } else {
                    db.collection('message').insert({'message': msg});
                }
                res.send('Successfully created collection and updated message');
            }
            db.close();
        });
    });
}