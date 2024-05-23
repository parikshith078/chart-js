"use client";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface DataDict {
  [date: string]: number;
}

export default function BarGraph({ barData }: { barData: DataDict }) {
  const [currentData, setCurrentData] = useState(barData);
  const filterData = filterDataByTime(barData);
  console.log("filterData:", filterData);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };
  const data = {
    labels: Object.keys(currentData).map((item) => formatDate(item)),
    datasets: [
      {
        label: "Test taken",
        data: Object.values(currentData),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-5 my-10 w-full justify-center">
      <div className="flex gap-10 justify-center">
        <button
          onClick={() => {
            setCurrentData(filterData.allTime);
          }}
        >
          All time
        </button>
        <button
          onClick={() => {
            setCurrentData(filterData.last3Months);
          }}
        >
          Last 3 month
        </button>
        <button
          onClick={() => {
            setCurrentData(filterData.lastMonth);
          }}
        >
          Last month
        </button>
      </div>
      <Bar options={options} data={data} />;
    </div>
  );
}

function filterDataByTime(data: DataDict): {
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

function formatDate(inputDate: string): string {
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
