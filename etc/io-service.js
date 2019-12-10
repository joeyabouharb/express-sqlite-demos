/* eslint-disable no-restricted-syntax */
const readline = require('readline');
const fs = require('fs');
const { establishConnection } = require('../services/database_service');

const filename = './data/1mildummycontacts.csv';
const csvProcessor = async function* process() {
  const rl = readline.createInterface({
    input: fs.createReadStream(filename),
    crlfDelay: Infinity,
  });
  let count = 0;
  const headers = [];
  for await (const line of rl) {
    const row = line.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
    if (count === 0) {
      for (const col of row) {
        const property = col.trim();
        headers.push(property);
      }
      count += 1;
    } else {
      const entry = {};
      Object.assign(
        entry, ...Array.from(
          row.map((value, index) => [`$${headers[index]}`, value]), ([k, v]) => ({ [k]: v }),
        ),
      );
      yield entry;
    }
  }
};


(async () => {
  const sql = `
    INSERT INTO contacts(name, birthday, email, phone, city)
    VALUES ($name, $birthday, $email, $phone, $city)
  `;
  const db = establishConnection('./db/contancts.db');

  const items = csvProcessor();
  for await (const item of items) {
    await db.WRITE(sql, item);
  }
})();
