// import our CSV parser (not a library - this is the one we're writing in csv.js)
const csv = require('./csv.js');

// pass the path of the CSV file to the parser
let cool = new csv('./data.csv');

// parse the CSV into a javascript array and print it
(async ()=>{
  let rows = await cool.parse();
  console.log(rows);
})();

// NEXT:

/*
Take that javascript array and insert it into mongodb making sure to:

- check for duplication
- store all of it relative to an event ID (fake ID for now)
*/
