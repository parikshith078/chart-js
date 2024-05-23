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
    <div className="flex flex-col gap-10 items-center">
      <div className="h-[50vh] w-full flex justify-center">
        <ScatterPlot wpmData={scatterGraphData} />
      </div>
      <div className="flex w-full h-[50vh] gap-10 justify-center">
        <div className="w-[50%] flex justify-center ">
          <BarGraph barData={barGraphData} />
        </div>
        <div className="w-[50%] flex justify-center">
          <PieChart pieData={pieChartData} />
        </div>
      </div>
    </div>
  );
}
