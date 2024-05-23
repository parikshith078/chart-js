import BarGraph from "@/components/BarGraph";
import PieChart from "@/components/PieChart";
import ScatterPlot from "@/components/ScatterPlot";
import {
  getPieChartData,
  getBarGraphData,
  getScaterGraphData,
} from "@/lib/data";

export default async function Home() {
  const scatterGraphData = await getScaterGraphData();
  const barGraphData = await getBarGraphData();
  const pieChartData = await getPieChartData();
  return (
    <div className="flex flex-col gap-10 items-center mx-10 my-10">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl ">
        Typing Insights: 14 Feb 2023 - 15th May 2024
      </h1>
      <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8">
        <h5 className="mb-2 text-2xl text-center pt-2 font-bold tracking-tight text-gray-900">
          Word Per Minute Over Time
        </h5>
        <ScatterPlot wpmData={scatterGraphData} />
      </div>
      <div className="flex w-full justify-center gap-4 sm:flex-col sm:items-center lg:flex-row lg:items-start">
        <div className="w-[70%] p-1 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-4">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            Test Taken Over Time
          </h5>
          <BarGraph barData={barGraphData} />
        </div>
        <div className="w-full max-w-md p-1 h-full bg-white border border-gray-200 rounded-lg shadow sm:p-2">
          <h5 className="mb-2 text-2xl text-center pt-2 font-bold tracking-tight text-gray-900">
            Different Modes Taken
          </h5>
          <PieChart pieData={pieChartData} />
        </div>
      </div>
    </div>
  );
}
