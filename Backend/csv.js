const fast_csv = require('fast-csv'),
  fs = require('fs'),
  mongodb = require('mongodb');

class CSV_parser {
  constructor(path_to_csv) {
    this.path = path_to_csv;
  }
  
  // Streams the CSV file and parses it asynchronously.
  parse() {
    return new Promise((res, rej) => {
      let rows = [];
      let feedback = [];
      fs.createReadStream(this.path)
        .pipe(
          fast_csv({
            // This may look strange, but it has a purpose. 
            // There are ~89 columns in the CSV, and we only care about a few of them.
            // So, this is a sparse array containing the ones we want, and empty space
            // for every one we don't want.
            headers: [
              , , , , , ,
              "FirstName",
              "LastName", , , , , , , , , , , ,
              "Email",
              "CellPhone", , , , , , , , , , , , ,
              "ROLE",
              "BACKUP ROLE", , , , , , , , , ,
              'Room', , , , , , , , , ,
              "TRAINING DATE(s)", , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , , ,
            ],
            // Replace the first line of the CSV file (the header line) with our sparse array.
            renameHeaders: true
          })
          .on('data', (row) => {
            let newRow = {
              name: row['FirstName'] + ' ' + row['LastName'],
              email: row['Email'],
              cell: row['CellPhone'],
              assignment: row['ROLE'],
              location: row['Room']
            };
            if(newRow.name && newRow.email && newRow.cell && newRow.assignment && newRow.location){
              rows.push(newRow);
            } else {
              const rowRepresentation = [
                row['FirstName'], row['LastName'], row['Email'], 
                row['CellPhone'], row['ROLE'], row['Room']
              ].join(', ');
              feedback.push(`Skipped:\t${rowRepresentation}\nThis row was missing either FirstName, LastName, Email, CellPhone, ROLE, or Room data.\n`);
            }
            
          })
          .on('end', () => {
            res({rows: rows, feedback: feedback});
          })
        );
    });
  }
  
  insert(dbconn, event_name, data){   
    dbconn().then((db) => {
        if (err) throw err;

        // start by finding the bowl which has the volunteer with the highest ID
        db.collection('bowls').find().sort({'volunteers.id': -1}).limit(1).toArray((err, items) => {
          // if there are no rows at all, we will start with 1
          let maxId = 0;
          // of the bowl that has the volunteer with the highest id, actually find that id and save it
          for (let item of items){
            if(item['id'] > maxId){
              maxId = item['id'];
            }
          }

          // assign each row to an incrementing id
          for (let row=0; row<data.length; row++) {
            maxId += 1;
            data[row]['id'] = maxId;
          }
          // insert all our data
          for (let row=0; row<data.length; row++) {
            // do a "upsert" insert or update on cell number
            db.collection('bowls').update({
              'name': event_name,
              'volunteers.cell': data[row]['cell']
            }, {
              $set: {
                'volunteers.$': data[row]
              }
            }, {upsert: true});
          }
          
          db.close();
        });
    });
  }
}

module.exports = CSV_parser;
