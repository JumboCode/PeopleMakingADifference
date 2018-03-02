module.exports = function(app, dbconn){
	// The parameter must be name 'message'
    app.post('/send_sms', function(req, res) {
        if (!req.body.phone_number && !req.body.msg_content) {
            res.send('Error: malformed request');
        }

        auth = require("../twilio-key.json");

        // require the Twilio module and create a REST client
        const client = require('twilio')(auth.accountSid, auth.authToken);

        client.messages.create({
            to: req.body.phone_number,
            from: '+19093455880',
            body: req.body.msg_content,
        })
        .then(message => console.log(message.sid));

    });
}
