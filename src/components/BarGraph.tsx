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
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface BarData {
  [key: string]: number;
}

export default function BarGraph({ barData }: { barData: BarData }) {
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
    labels: Object.keys(barData).map((item) => formatDate(item)),
    datasets: [
      {
        label: "Test taken",
        data: Object.values(barData),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={data} />;
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
