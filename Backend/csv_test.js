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
  let rows = await cool.parse();
  cool.insert(rows);
})();

// NEXT:

/*
- store all of it relative to an event ID (fake ID for now)
*/
