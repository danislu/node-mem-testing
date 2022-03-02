import csv from 'csv-parser';
import fs from 'fs';

const [inputFileName, outputFileName, fieldName = 'path'] = process.argv.slice(2);

const outputData = [];

fs.createReadStream(inputFileName)
  .pipe(csv())
  .on('data', (data) => outputData.push(data[fieldName]))
  .on('end', () => fs.writeFileSync(outputFileName, JSON.stringify(outputData)));
