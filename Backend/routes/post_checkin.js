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
            if (items[0].volunteers[0].checkin == false) {
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
              res.send(items[0].volunteers[0]);
            } else {
              res.send(items[0].volunteers[0]);
            }
            // send the sms verification token
            sms(dbconn, req.body.phone, items[0].volunteers[0].id);
          } else {
            res.status(400);
            res.send('Error: UID Not Found!');
          }
          db.close();
        });

      });
  });
}
