module.exports = function(dbconn, phone_num, uid){

    auth = require("./twilio-key.json");

    var verif_num = "";
    for (var i = 0; i < 5; i++) {
        verif_num += parseInt(Math.random() * 10) + "";
    }

    // require the Twilio module and create a REST client
    const client = require('twilio')(auth.accountSid, auth.authToken);

    client.messages.create({
        to: phone_num,
        from: '+19093455880',
        body: 'Your PMD verification code is: ' + verif_num,
    })
    .then(message => console.log(message.sid));

    dbconn().then((db) => {
        db.collection('bowls').update({'volunteers.id': parseInt(uid)},
        {
            $set: {
                'volunteers.$.verif_code': verif_num,
            },
        })
    });
}
