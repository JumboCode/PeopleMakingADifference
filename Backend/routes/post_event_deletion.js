module.exports = function(app, dbconn){
  app.post('/delete_event', function(req, res) {
      dbconn().then((db) => {
        // if document with argument phone exists then update, otherwise return UID not found
        db.collection('bowls').deleteOne(
          {
            id: req.body.eventId
          }
        ).then((response) => {
          console.log(response);
          res.status(200).send({'message': 'success!'});
        }).catch((err) => {
          console.error(err);
          res.status(400).send({'error': true, 'message': 'Could not delete ' + req.body.eventId});
        })

      });
  });
}
