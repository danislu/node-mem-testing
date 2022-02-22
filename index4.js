import axios from 'axios';
import lodash from 'lodash';

const [path, rounds = 1, perRound = 1, roundDelay = 0, cooldown = 0.5, sync = null] = process.argv.slice(2);

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const waitLoud = async (ms, wow = 5000) => {
  const count = Math.round(ms / wow);
  for (let index = 0; index < count; index++) {
    await wait(wow);
    console.log(`${Math.round(wow + (wow * index + 1)) / 1000} sec elapsed`);
  }
}


for (let index = 0; index < rounds; index++) {
  const work = lodash.range(0, perRound).map(async (_, reqNum) => {
    try {
      const response = await axios.get(path);
      console.log(`✅  ${reqNum+1}/${perRound} - ${index+1}/${rounds}`, path, response?.status);
    } catch (error) {
      console.log(`❌  ${reqNum+1}/${perRound} - ${index+1}/${rounds}`, path, error?.response?.status);
    }
  });

  if (sync) {
    await Promise.all(work);
  }

  await wait(roundDelay);
}

if (!sync) {
  console.log(`Wait ${cooldown} min for stuff to settle`);
  await waitLoud(1000 * 60 * cooldown);
}

