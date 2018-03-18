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
              cell: row['CellPhone'].replace(/\-/g, ""),
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
              feedback.push(`Skipped:    ${rowRepresentation}<br />This row was missing either FirstName, LastName, Email, CellPhone, ROLE, or Room data.`);
            }
            
          })
          .on('end', () => {
            if (feedback.length === 0){
              feedback = ["All rows parsed successfully."];
            }
            res({rows: rows, feedback: feedback});
          })
        );
    });
  }
  
  async insert(dbconn, event_name, data){
    let db = await dbconn();   
    // start by finding the bowl which has the volunteer with the highest ID
    let err, bowls = await db.collection('bowls').find().sort({'volunteers.id': -1}).limit(1).toArray();
    // if there are no rows at all, we will start with 1
    let maxId = 0;
    if(bowls.length > 0) {
      // of the bowl that has the volunteer with the highest id, actually find that id and save it
      for (let item of bowls[0]['volunteers']){
        if(item['id'] > maxId){
          maxId = item['id'];
        }
      }
    }

    // assign each row to an incrementing id
    for (let row=0; row<data.length; row++) {
      maxId += 1;
      data[row]['id'] = maxId;
    }

    // check if an event already exists with the submitted name
    let event_query_err, event_query_bowls = await db.collection('bowls').find({
      'name': event_name
    }).toArray();

    // if it does not, create it and populate it with data
    if(event_query_bowls.length === 0){
      let event_insert_err, event_insert_bowls = await db.collection('bowls').insert({
        'name': event_name,
        'message': 'Thank you for volunteering!',
        'id': 'dummy',
        'volunteers': []
      });
    }


    // insert all our data
    for (let row=0; row<data.length; row++) {
      // Start by attempting an update
      // we can't do an upsert here because the volunteer data is inside an array
      let volunteer_update_err, volunteer_update_result = await db.collection('bowls').update({
        'name': event_name,
        'volunteers.cell': String(data[row]['cell'])
      }, {
        $set: {
          'volunteers.$': data[row]
        }
      });

      // if we didn't just update an existing row, we must be inserting a new row...
      if(volunteer_update_result.result.nModified === 0){
        // insert it by pushing the new row onto the volunteers array
        let volunteer_push_err, volunteer_push_result = await db.collection('bowls').update({
          'name': event_name
        }, {
          $push: {
            'volunteers': data[row]
          }
        });
      }
    } 
    db.close(); 
  }
}

module.exports = CSV_parser;
