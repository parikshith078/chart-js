"use client";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useState } from "react";
import { Scatter } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

interface DataPoint {
  x: number;
  y: number;
}
// TODO: Fix x axis labels
// TODO: Add title and legend
export function ScatterPlot({ wpmData }: { wpmData: DataPoint[] }) {
  const sortData = sortDataByTime(wpmData);
  const [currentData, setCurrentData] = useState(sortData.allTime);

  const data = {
    datasets: [
      {
        label: "A dataset",
        data: currentData,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  return (
    <div className="flex flex-col gap-5 my-10 w-full justify-center">
      <div className="flex gap-10 justify-center">
        <button
          onClick={() => {
            setCurrentData(sortData.allTime);
          }}
        >
          All time
        </button>
        <button
          onClick={() => {
            setCurrentData(sortData.last3Months);
          }}
        >
          Last 3 month
        </button>
        <button
          onClick={() => {
            setCurrentData(sortData.lastMonth);
          }}
        >
          Last month
        </button>
      </div>
      <Scatter options={options} data={data} />
    </div>
  );
}

function sortDataByTime(data: DataPoint[]): {
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
