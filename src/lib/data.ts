import fs from "node:fs";
import { parse } from "csv-parse";

export const headers = [
  "_id",
  "isPb",
  "wpm",
  "acc",
  "rawWpm",
  "consistency",
  "charStats",
  "mode",
  "mode2",
  "quoteLength",
  "restartCount",
  "testDuration",
  "afkDuration",
  "incompleteTestSeconds",
  "punctuation",
  "numbers",
  "language",
  "funbox",
  "difficulty",
  "lazyMode",
  "blindMode",
  "bailedOut",
  "tags",
  "timestamp",
];

export const getDataFromCsv = async () => {
  const records = [];
  const path = process.cwd() + "/public/typing-data.csv";
  const parser = fs.createReadStream(path).pipe(
    parse({
      // CSV options if any
    }),
  );
  for await (const record of parser) {
    // Work with each record
    records.push(record);
  }
  return records;
};

export const wpmData = async () => {
  const records = await getDataFromCsv();
  return extractWpmAndTimestamp(records);
};

 const extractWpmAndTimestamp = (records: string[][]) => {
  const data = [];
  for (let i = 1; i < records.length; i++) {
    const record = records[i];
    data.push({
      x: parseInt(record[headers.length - 1]),
      y: parseFloat(record[2]),
    });
  }
  return data;
};

export const countMode = async () => {
  const records = await getDataFromCsv();
  const data = {
    quote: 0,
    custom: 0,
    time: 0,
    words: 0,
  };

  for (let i = 1; i < records.length; i++) {
    const record = records[i];
    switch (record[7]) {
      case "quote":
        data.quote++;
        break;
      case "custom":
        data.custom++;
        break;
      case "time":
        data.time++;
        break;
      case "words":
        data.words++;
        break;
    }
  }
  console.log(data);
  return data;
};

export const formattedDateData = async () => {
  const data = await getDataFromCsv();
  for (let i = 1; i < data.length; i++) {
    data[i][headers.length - 1] = formatDate(
      parseInt(data[i][headers.length - 1]),
    );
  }
  const testFrequencyByDate: any = {};
  for (let i = 1; i < data.length; i++) {
    const date = data[i][headers.length - 1];
    if (testFrequencyByDate[date] === undefined) {
      testFrequencyByDate[date] = 1;
    } else {
      testFrequencyByDate[date]++;
    }
  }
  return testFrequencyByDate;
};

const formatDate = (timeStamp: number) => {
  const date = new Date(timeStamp);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
};

