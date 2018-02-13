module.exports = function(app, dbconn){
  // The parameter must be name 'checkout'
    app.post('/update_checkin', function(req, res) {
        dbconn().then((db) => {
          // if document with argument phone exists then update, otherwise return UID not found
          existenceCheck = db.collection('bowls').find(
            {
              id: req.body.eventId, 
              'volunteers.phone': parseInt(req.body.phone)
            }, 
            {
              'volunteers.$': 1
            }
          ).toArray(function(err, items) {
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
              } else {
                res.send('Error: UID Not Found!');
              }
              db.close();
          });
            
        });
    });
}