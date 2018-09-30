const messaging = require('../messaging/messaging.js');
module.exports = function(app, dbconn){
	// The parameters must be uid and location
    app.post('/update_location', function(req, res) {
        dbconn().then((db) => {
            // if document with argument id exists then update, otherwise return UID not found
            existenceCheck = db.collection('bowls').find({'volunteers.id': parseInt(req.body.uid)}).toArray(function(err, items) {
                if (items.length > 0) {
                    db.collection('bowls').update({'volunteers.id': parseInt(req.body.uid)},
                        {
                            $set: {
                                'volunteers.$.location': req.body.location,
                            },
                        }
                    );
                    const payload = {
                        android: {
                            notification: {
                                title: `PMD: ${items[0].name}`,
                                body: `Location update: ${req.body.location}`,
                                icon: `fcm_push_icon`,
                            }
                        },
                        apns: {
                            payload: {
                                aps: {
                                    alert: {
                                        title: `PMD: ${items[0].name}`,
                                        body: `Location update: ${req.body.location}`
                                    }
                                }
                            }
                        }
                    }
                    messaging.messageOne(dbconn, parseInt(req.body.uid), payload)
                    .then(response => {
                        console.log('sent', response);
                    })
                    .catch(err => {
                        console.error('push error', err);
                    });
                    res.send('Successfully updated location');
                } else {
                    res.status(400);
                    res.send('Error: UID Not Found!');
                }
                db.close();
            });

        });
    });
}
