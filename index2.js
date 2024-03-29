import fs from 'fs';
import axios from 'axios';
import readline from 'readline';

const rl = readline.createInterface({
  input: fs.createReadStream('input.txt'),
  crlfDelay: Infinity
});

rl.on('line', (path) => {
  for (let index = 0; index < 5; index++) {
    axios.get(path)
      .then(
        (response) => console.log("👍", path, response?.status),
        (error) => console.log("👎", path, error?.response?.status),
      );
    }
});

rl.on('close', () => console.log("DONE"));

