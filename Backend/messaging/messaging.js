const admin = require("firebase-admin"),
  serviceAccount = require("./demo-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://people-making-a-difference.firebaseio.com"
});

module.exports = {
  messageOne: function(dbconn, uid, payload){
    return new Promise((resolve, reject) => {
      dbconn().then(db => {
        db.collection('bowls').find(
          {
            "volunteers": {
              $elemMatch: {
                id: uid,
                token: {
                  $exists: true
                }
              }
            }
          },
          {
            'volunteers.$': 1
          }
        ).toArray((err, items) => {
          if(items.length === 1){
            const token = items[0].volunteers[0].token;
            admin.messaging().sendToDevice(token, payload)
            .then(response => {
              resolve(response);
              return;
            })
            .catch(err => {
              reject(err);
              return;
            })
          }
        });
      });
    });
  },

  messageAll: function(dbconn, eventId, payload){
    return new Promise((resolve, reject) => {
      dbconn().then(db => {
        db.collection('bowls').find(
          {
            "id": eventId
          }
        ).toArray((err, items) => {
          if(items.length === 1){
            // this will resolve a promise whether it rejects or resolves with no errors
            const reflect = function(promise){
              return promise.then(
                function(){
                  return {status: "resolved"}
                },
                function(){
                  return {status: "rejected"}
                });
            }
            let push_promises = [];
            for(let volunteer of items[0].volunteers){
              const token = volunteer.token;
              if(token){
                push_promises.push(admin.messaging().sendToDevice(token, payload));
              }
            }
            // await all the push notification attempts
            // it is ok and expected if some of them fail
            Promise.all(push_promises.map(reflect))
            .then((results) => {
              resolve(`Attempted to send ${results.length}, ${results.filter(x => x.status === "resolved").length} succeeded.`);
              return;
            })
            .catch(err => {
              reject(err);
              return;
            })
          }
        });
      });
    });

  }
}
