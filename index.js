import csv from 'csv-parser';
import fs from 'fs';
import axios from 'axios';

fs.createReadStream('log2.csv')
  .pipe(csv())
  // .on('data', (data) => results.push(data))
  .on('data', (data) => {
    try {
      const path = data.path;
      if (path.includes("_next")) {
        return;
      }

      axios.get(`http://localhost:3000${path}`)
        .then(
          (response) => console.log("👍", path, response?.status),
          (error) => console.log("👎", path, error?.response?.status),
        );
    } catch (ex) {
      //
    }
  })
  // paths.push(data.path))
  .on('end', () => {});

