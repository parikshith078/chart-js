"use client";
import { DataPoint } from "@/lib/types";
import { sortDataByTime } from "@/lib/utils";
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
import { FilterButtons } from "./FilterButtons";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const options = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

// TODO: Fix x axis labels
// TODO: Add title and legend

export default function ScatterPlot({ wpmData }: { wpmData: DataPoint[] }) {
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
      <FilterButtons data={sortData} setData={setCurrentData} />
      <Scatter options={options} data={data} />
    </div>
  );
}

