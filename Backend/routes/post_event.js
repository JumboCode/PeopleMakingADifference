/*
Example code - not finished!
All it does is confirm that the files are being uploaded.
*/
module.exports = function(app, dbconn){
    const multer = require('multer');
    const upload = multer({ dest: 'uploads/' });
    const cpUpload = upload.fields([
        { name: 'csvFile', maxCount: 1 }, 
        { name: 'eventName', maxCount: 1 }
    ]);
	app.post('/update_event', cpUpload, function(req, res, next) {
        // dbconn().then((db) => {
        //      db.collection('bowls').find().toArray(function(err, items) {
        //         res.send(items);
        //         db.close();
        //     });
            
        // });
        res.send("hello!");
        console.log(req.files['csvFile']);
    });
}