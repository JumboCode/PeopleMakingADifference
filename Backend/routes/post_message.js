module.exports = function(app, dbconn){
	// The parameter must be name 'message'
    app.post('/update_message', function(req, res) {
        dbconn().then((db) => {
            const msg = req.body.message;
            if (/[\\/&;<(*)>$=]/.test( msg )) {
                res.status(400);
                res.send('Invalid input!\n');
            } else {
                console.log(msg);
                db.collection('bowls').update(
                    {
                        'id': req.body.eventId
                    }, 
                    {
                        $set: {
                            'message': msg
                        }
                    }
                ).catch((err) => console.error(err));
                res.send('Successfully updated message');
            }
            db.close();
        });
    });
}