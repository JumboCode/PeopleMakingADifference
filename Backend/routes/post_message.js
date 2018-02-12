module.exports = function(app, dbconn){
	// The parameter must be name 'message'
    app.post('/update_message', function(req, res) {
        dbconn().then((db) => {
            const msg = req.body.message;
            if (/[\\/&;<(*)>$=]/.test( msg )) {
                res.send('Invalid input!\n');
            } else {
                console.log(msg);
                db.collection('bowls').update({active: true}, 
                {
                    $set: {
                        'message': msg
                    }
                }).catch((err) => console.error(err));
                res.send('Successfully updated message');
            }
            db.close();
        });
    });
}