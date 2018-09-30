const messaging = require('../messaging/messaging.js');
module.exports = function(app, dbconn){
  // The parameter must be name 'eventId'
    app.post('/update_reminder', function(req, res) {
      const payload = {
        notification: {
          title: `PMD: Did You Forget?`,
          body: `We have not received your check-out time. No problem - just tap here to set it!`,
          icon: `fcm_push_icon`,
          click_action: "FCM_PLUGIN_ACTIVITY",
        },
        data: {
          intent: 'checkout_reminder'
        }
      }

      if(req.body.eventId){
        messaging.messageAll(dbconn, req.body.eventId, payload, (volunteer) => !volunteer.checkout)
        .then(response => {
          console.log(response);
          res.send('Success');
        })
        .catch(err => {
          console.log(error);
          res.status(400).send('Error!');
        });
      } else {
        res.status(400).send('Please provide a valid event id.');
      }

    });
}
