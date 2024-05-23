import { DataDict, DataPoint } from "./types";

/// in YYYY-MM-DD format
export const formatDate = (timeStamp: number) => {
  const date = new Date(timeStamp);
  const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
  return formattedDate;
};

export function sortDataByTime(data: DataPoint[]): {
  last3Months: DataPoint[];
  lastMonth: DataPoint[];
  allTime: DataPoint[];
} {
  const currentDate = new Date();
  const lastMonthData: DataPoint[] = [];
  const last3MonthsData: DataPoint[] = [];
  const allTimeData: DataPoint[] = [];

  const threeMonthsAgo = new Date(currentDate);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  data.forEach((item) => {
    if (item.x >= threeMonthsAgo.getTime()) {
      last3MonthsData.push(item);
    }
    if (item.x >= lastMonth.getTime()) {
      lastMonthData.push(item);
    }
    allTimeData.push(item);
  });

  return {
    last3Months: last3MonthsData,
    lastMonth: lastMonthData,
    allTime: allTimeData,
  };
}


export function filterDataByTime(data: DataDict): {
  last3Months: DataDict;
  lastMonth: DataDict;
  allTime: DataDict;
} {
  const currentDate = new Date();
  const lastMonthData: DataDict = {};
  const last3MonthsData: DataDict = {};
  const allTimeData: DataDict = {};

  const threeMonthsAgo = new Date(currentDate);
  threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

  const lastMonth = new Date(currentDate);
  lastMonth.setMonth(lastMonth.getMonth() - 1);

  for (const date in data) {
    if (new Date(date) >= threeMonthsAgo) {
      last3MonthsData[date] = data[date];
    }
    if (new Date(date) >= lastMonth) {
      lastMonthData[date] = data[date];
    }
    allTimeData[date] = data[date];
  }

  return {
    last3Months: last3MonthsData,
    lastMonth: lastMonthData,
    allTime: allTimeData,
  };
}


export function formatDateToMonth(inputDate: string): string {
  const date = new Date(inputDate);
  const day = date.getDate();
  const suffix =
    day % 10 == 1 && day !== 11
      ? "st"
      : day % 10 == 2 && day !== 12
        ? "nd"
        : day % 10 == 3 && day !== 13
          ? "rd"
          : "th";
  const month = new Intl.DateTimeFormat("en", { month: "short" }).format(date);

  return `${day}${suffix} ${month}`;
}
