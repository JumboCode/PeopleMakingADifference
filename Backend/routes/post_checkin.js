module.exports = function(app, dbconn){
  // The parameter must be name 'checkout'
    app.post('/update_checkin', function(req, res) {
        dbconn().then((db) => {
            // if document with argument phone exists then update, otherwise return UID not found
            console.log(req.body);
            existenceCheck = db.collection('bowls').find({'volunteers.phone': parseInt(req.body.phone)}, {'volunteers.$': 1}).toArray(function(err, items) {
                if (items.length > 0) {
                  if (items[0].volunteers[0].checkin == false) {
                      db.collection('bowls').update({'volunteers.phone': parseInt(req.body.phone)},
                          {
                                $set: {
                                    'volunteers.$.checkin': Date.now(),
                                },
                          });
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