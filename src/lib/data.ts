import fs from "node:fs";
import { parse } from "csv-parse";
import { OutputFormat } from "./types";
import { formatDate } from "./utils";

const headers = [
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

const getDataFromCsv = async () => {
  const records = [];
  const path = process.cwd() + "/public/typing-data.csv";
  const parser = fs.createReadStream(path).pipe(parse({}));
  for await (const record of parser) {
    records.push(record);
  }
  return records;
};

export const getScaterGraphData = async () => {
  const records = await getDataFromCsv();
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

export const getBarGraphData = async () => {
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

export const getPieChartData = async (): Promise<OutputFormat> => {
  const data = await getDataFromCsv();
  const currentDate = new Date();
  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  const last3MonthsAgo = new Date(currentDate);
  last3MonthsAgo.setMonth(last3MonthsAgo.getMonth() - 3);

  const countByMode: OutputFormat = {
    allTime: { time: 0, quote: 0, custom: 0, words: 0 },
    last3Months: { time: 0, quote: 0, custom: 0, words: 0 },
    lastMonth: { time: 0, quote: 0, custom: 0, words: 0 },
  };

  for (let i = 1; i < data.length; i++) {
    const timestamp = parseInt(data[i][23]);
    const mode = data[i][7];
    if (
      !(
        mode === "quote" ||
        mode === "custom" ||
        mode === "time" ||
        mode === "words"
      )
    ) {
      continue;
    }

    if (timestamp >= lastMonth.getTime()) {
      countByMode.lastMonth[mode]++;
    }

    if (timestamp >= last3MonthsAgo.getTime()) {
      countByMode.last3Months[mode]++;
    }

    countByMode.allTime[mode]++;
  }

  return countByMode;
};
