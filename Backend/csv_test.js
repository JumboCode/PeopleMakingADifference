if (process.argv.length < 3) {
  console.error("💩💩💩 Provide a path to the CSV as an argument. 💩💩💩");
  process.exit(1);
}

// import our CSV parser (not a library - this is the one we're writing in csv.js)
const csv = require('./csv.js');

const path_to_csv = process.argv[2];

// pass the path of the CSV file to the parser
const cool = new csv(path_to_csv);

// parse the CSV into a javascript array and print it
(async ()=>{
  let uri = '';
  if (process.argv[2] == '--local' || process.argv[2] == '-l') {
      uri = 'mongodb://localhost:27017/pmd';
      console.log('Database set to local.');
  } else if (process.argv[2] == '--prod' || process.argv[2] == '-p') {
      uri = process.env.MONGODB_URI;
      console.log('Database set to production.');
  } else {
      console.log('Defaulted database to local. Use option --prod if production needed.');
      uri = 'mongodb://localhost:27017/pmd';
  }

  let (err, db) = await mongodb.MongoClient.connect(uri);
  let dbconn = () => new Promise((res, rej) => res(db));
  let rows = await cool.parse();
  cool.insert(dbconn, rows);
})();

// NEXT:

/*
- store all of it relative to an event ID (fake ID for now)
*/
