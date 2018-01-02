const fast_csv = require('fast-csv'),
  fs = require('fs');

class CSV_parser {
  constructor(path_to_csv) {
    this.path = path_to_csv;
  }
  
  // Streams the CSV file and parses it asynchronously.
  parse() {
    return new Promise((res, rej) => {
      let rows = [];
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
            rows.push(row);
          })
          .on('end', () => {
            res(rows);
          })
        );
    });
  }
}

module.exports = CSV_parser;