const messaging = require('../messaging/messaging.js');
module.exports = function(app, dbconn){
  // The parameter must be name 'eventId'
    app.post('/update_reminder', function(req, res) {
        dbconn().then((db) => {
            // if document with argument id exists then update, otherwise return UID not found
            existenceCheck = db.collection('bowls').find(
                {
                    'id': req.body.eventId,
                    $exists: {
                        'volunteers.token': true
                    }
                },
            ).toArray(function(err, items) {
                if (items.length > 0) {
                    console.log(items);

                  // if (items[0].volunteers[0].checkout == false) {
                  //     db.collection('bowls').update(
                  //           {
                  //               'volunteers.id': parseInt(req.body.uid),
                  //               'exit_id': req.body.exitId
                  //           },
                  //         {
                  //               $set: {
                  //                   'volunteers.$.checkout': Date.now(),
                  //               },
                  //         });
                  //         res.send('Successfully Checked Out');   
                  //   } else {
                  //       res.status(400);
                  //     res.send('Error: You have already checked out!');
                    }
                } else {
                    res.status(400);
                    res.send('Error: Incorrect UID or exit code.');
                }
                db.close();
            });
            
        });
    });
}