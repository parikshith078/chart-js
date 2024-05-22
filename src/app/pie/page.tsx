import PieChart from "@/components/PieChart";
import { countMode } from "@/lib/data";

export default async function Home() {
  const res = await countMode()
  const data = Object.values(res)
  return (
    <>
      <PieChart pieData={data} />
    </>
  );
}
