/*
Example code - not finished!
All it does is confirm that the files are being uploaded.
*/
module.exports = function(app, dbconn){
  const multer = require('multer');
  // define a function that only accepts CSV files
  const fileFilter = (req, file, cb) => {
    if(file.fieldname == 'csvFile'
      &&
      ( 
        file.mimetype == 'text/csv'
        ||
        file.mimetype == 'application/csv'
      )
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  }

  const storageHandler = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads')
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}.csv`)
    }
  })    

  const upload = multer({ storage: storageHandler, fileFilter: fileFilter });
  const cpUpload = upload.fields([
      { name: 'csvFile', maxCount: 1 }
  ]);
	app.post('/update_event', cpUpload, function(req, res, next) {
        // dbconn().then((db) => {
        //      db.collection('bowls').find().toArray(function(err, items) {
        //         res.send(items);
        //         db.close();
        //     });
            
        // });
        if('csvFile' in req.files){
          const csv = require('../csv.js');
          const filepath = req.files.csvFile[0].path;
          console.log('got path', filepath);
          const parser = new csv(filepath);
          parser.parse().then(parseResult => {
            const {rows, feedback} = parseResult;
            for(let feedbackResult of feedback){
              console.log(feedbackResult);
            }
          })
        } else {
          console.log('did not');
          console.log(req.files);
        }
        res.send('lol');
    });
}