import axios from 'axios';
import range from 'lodash/range';

const [path, rounds = 1, perRound = 1, roundDelay = 0] = process.argv.slice(2);

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

for (let index = 0; index < rounds; index++) {

  await Promise.all(range(0, perRound).map(async (_, reqNum) => {
    try {
      const response = await axios.get(path);
      console.log(`✅  ${reqNum}/${perRound} - ${index}/${rounds}`, path, response?.status);
    } catch (error) {
      console.log(`❌  ${reqNum}/${perRound} - ${index}/${rounds}`, path, error?.response?.status);
    }
  }));

  await wait(roundDelay);
}

console.log("Wait 2 min for stuff to settle");

await wait(1000 * 60 * 2);

console.log("DONE!")

