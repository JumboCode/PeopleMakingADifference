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
        if('csvFile' in req.files){
          const csv = require('../csv.js');
          const filepath = req.files.csvFile[0].path;
          const parser = new csv(filepath);
          parser.parse().then(parseResult => {
            const {rows, feedback} = parseResult;
            res.send(feedback.join('<br />'));
          })
        } else {
          res.status(400).send('No file!');
        }
    });
}