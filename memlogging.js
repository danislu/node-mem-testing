import axios from 'axios';
import { appendFileSync } from 'fs';

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

while (true) {
  const { data } = await axios('http://localhost:3000/api/memory');
  console.log(data);

  appendFileSync('mem.log', JSON.stringify(data));

  await wait(1000);
}