"use client";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

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
export function ScatterPlot({ wpmData }: { wpmData: any }) {
  const data = {
    datasets: [
      {
        label: "A dataset",
        data: wpmData,
        backgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };
  return <Scatter options={options} data={data} />;
}
