import BarGraph from "@/components/BarGraph";
import PieChart from "@/components/PieChart";
import { ScatterPlot } from "@/components/ScatterPlot";
import { countMode, formattedDateData, wpmData } from "@/lib/data";

export default async function Home() {
  const scatterData = await wpmData();
  const barData = await formattedDateData();
  const pieData = await countMode();
  return (
    <div className="flex flex-col gap-10 items-center">
      <div className="h-[50vh] w-full flex justify-center">
        <ScatterPlot wpmData={scatterData} />
      </div>
      <div className="flex w-full h-[50vh] gap-10 justify-center">
        <div className="w-[50%] flex justify-center ">
          <BarGraph barData={barData} />
        </div>
        <div className="w-[50%] flex justify-center">
          <PieChart pieData={pieData} />
        </div>
      </div>
    </div>
  );
}
