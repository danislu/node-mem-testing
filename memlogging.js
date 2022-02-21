import axios from 'axios';
import { appendFileSync } from 'fs';

const [port, filename] = process.argv.slice(2);

const wait = (ms) => new Promise((res) => setTimeout(res, ms));
while (true) {
  const { data } = await axios(`http://localhost:${port}/api/memory`);
  console.log(data);

  appendFileSync(`${filename}.json`, `${JSON.stringify(data)},`);

  await wait(2000);
}