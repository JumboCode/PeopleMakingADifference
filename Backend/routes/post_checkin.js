module.exports = function(app, dbconn){
  const sms = require('../messaging/sms.js');
  // The parameter must be name 'checkout'
  app.post('/update_checkin', function(req, res) {
      dbconn().then((db) => {
        // if document with argument phone exists then update, otherwise return UID not found
        db.collection('bowls').find(
          {
            id: req.body.eventId,
            'volunteers.phone': parseInt(req.body.phone)
          },
          {
            'volunteers.$': 1
          }
        ).toArray((err, items) => {
          if (items.length > 0) {
            if (!items[0].volunteers[0].checkin) {
              db.collection('bowls').update(
                {
                  id: req.body.eventId,
                  'volunteers.phone': parseInt(req.body.phone)
                },
                {
                  $set: {
                    'volunteers.$.checkin': Date.now(),
                  }
                }
              );
            } else if (items[0].volunteers[0].checkout){
              res.status(400).send({
                'message': 'You have already checked out from this event.'
              });
              return;
            }
            // send only the data we need to send
            const {id, name} = items[0].volunteers[0];
            
            // send the sms verification token
            sms(dbconn, req.body.phone, items[0].volunteers[0].id, req.body.debug);

            res.send({
              'id': id,
              'name': name
            });
            
          } else {
            res.status(400).send({
              'message': 'Error - no volunteer found for this event with this phone number.'
            });
          }
          db.close();
        });

      });
  });
}
