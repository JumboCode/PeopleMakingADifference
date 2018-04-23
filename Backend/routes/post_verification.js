module.exports = function(app, dbconn){
  app.post('/verification', function(req, res) {
    dbconn().then((db) => {
      db.collection('bowls').find(
        {
          "volunteers": {
            $elemMatch: {
              id: parseInt(req.body.uid),
              verif_code: req.body.verif_code
            }
          }
        },
        {
          'volunteers.$': 1
        }
      ).toArray((err, items) => {
        if(items.length === 1){
          res.send({'response': 'Ok, you\'re verified.'});
        } else {
          res.status(400);
          res.send('Error: Verification Incorrect!');
        }
      });
    });
  });
}
