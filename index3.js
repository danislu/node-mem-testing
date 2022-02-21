import axios from 'axios';

const [path, count = 1, delay = 0] = process.argv.slice(2);

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

for (let index = 0; index < count; index++) {
  try {
    const response = await axios.get(path);
    console.log(`✅ ${index}/${count}`, path, response?.status);
  } catch (error) {
    console.log(`❌ ${index}/${count}`, path, error?.response?.status);
  }

  await wait(delay);
}

