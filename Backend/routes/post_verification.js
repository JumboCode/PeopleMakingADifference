module.exports = function(app, dbconn){
    app.post('/verification', function(req, res) {
        dbconn().then((db) => {
        console.log(req.body.uid);
        console.log(req.body.verif_code);
        db.collection('bowls').find(
         {
                "volunteers": {
                  $elemMatch: {
                    id: req.body.uid,
                    verif_code: "" + req.body.verif_code
                  }
                }
              },
              {
                'volunteers.$': 1
              }
            ).toArray((err, items) => {
                  if(items.length === 1){
                      res.send(items[0].volunteers[0]);
              } else {
                      res.status(400);
                      res.send('Error: Verification Incorrect!');
              }
            });
        });
    });
}
