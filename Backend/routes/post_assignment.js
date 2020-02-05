const messaging = require('../messaging/messaging.js');
module.exports = function(app, dbconn){
	// The parameters must be uid and assignment
    app.post('/update_assignment', function(req, res) {
        dbconn().then((db) => {
            // if document with argument id exists then update, otherwise return UID not found
            existenceCheck = db.collection('bowls').find({'volunteers.id': parseInt(req.body.uid)}).toArray(function(err, items) {
                if (items.length > 0) {
                    db.collection('bowls').update({'volunteers.id': parseInt(req.body.uid)},
                        {
                            $set: {
                                'volunteers.$.assignment': req.body.assignment,
                            },
                        }
                    );

                    // send the notification to alert the user that their assignment has been updated
                    const payload = {
                        notification: {
                            title: `PMD: ${items[0].name}`,
                            body: `Assignment update: ${req.body.assignment}`,
                            icon: `fcm_push_icon`,
                        }
                    }
                    messaging.messageOne(dbconn, parseInt(req.body.uid), payload)
                    .then(response => {
                        console.log('sent', response);
                    })
                    .catch(err => {
                        console.error('push error', err);
                    });
                    res.send('Successfully updated assignment');

                } else {
                    console.error('UID NOT FOUND:', req.body.uid);
                    res.status(400);
                    res.send('Error: A User With That ID Was Not Found!');
                }
                db.close();
            });

        });
    });
}
