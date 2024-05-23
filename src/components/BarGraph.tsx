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
import { FilterButtons } from "./FilterButtons";
import { DataDict } from "@/lib/types";
import { filterDataByTime, formatDateToMonth } from "@/lib/utils";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function BarGraph({ barData }: { barData: DataDict }) {
  const [currentData, setCurrentData] = useState(barData);
  const filterData = filterDataByTime(barData);
  const data = {
    labels: Object.keys(currentData).map((item) => formatDateToMonth(item)),
    datasets: [
      {
        label: "Test taken",
        data: Object.values(currentData),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div className="flex flex-col gap-5 my-10  justify-center">
      <FilterButtons data={filterData} setData={setCurrentData} />
      <Bar
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: false,
              text: "Test Taken Over Time",
            },
          },
        }}
        data={data}
      />
    </div>
  );
}
