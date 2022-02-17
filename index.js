const csv = require('csv-parser')
const fs = require('fs')
const axios = require('axios');

fs.createReadStream('log2.csv')
  .pipe(csv())
  // .on('data', (data) => results.push(data))
  .on('data', (data) => {
    try {
      const path = data.path;
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

