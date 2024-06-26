"use client";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { FilterButtons } from "./FilterButtons";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ModeCount {
  [key: string]: number;
}
interface OutputFormat {
  allTime: ModeCount;
  last3Months: ModeCount;
  lastMonth: ModeCount;
}
export default function PieChart({ pieData }: { pieData: OutputFormat }) {
  const [currentData, setCurrentData] = useState(pieData.allTime)
  const data = {
    labels: Object.keys(currentData),
    datasets: [
      {
        label: "Test taken",
        data: Object.values(currentData),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };
  if (!pieData) return <div>Loading...</div>;
  return (
    <div className="flex flex-col gap-5 my-10  justify-center">
      <FilterButtons data={pieData} setData={setCurrentData} />
      <Pie options={
        {
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: false,
              text: "Different Modes Taken",
            },
          },
        }
      } data={data} />
    </div>
  );
}
