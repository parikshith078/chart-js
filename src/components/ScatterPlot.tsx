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


export default function ScatterPlot({ wpmData }: { wpmData: DataPoint[] }) {
  const sortData = sortDataByTime(wpmData);
  const [currentData, setCurrentData] = useState(sortData.allTime);

  const data = {
    datasets: [
      {
        label: "word per minute",
        data: currentData,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  return (
    <div className="">
      <FilterButtons data={sortData} setData={setCurrentData} />
      <Scatter
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: false,
              text: "WPM Over Time",
            },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
        data={data}
      />
    </div>
  );
}
