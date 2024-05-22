import BarGraph from "@/components/BarGraph";
import PieChart from "@/components/PieChart";
import { formattedDateData } from "@/lib/data";

export default async function Home() {
  const res = await formattedDateData()
  return (
    <>
      <h1>Hello world</h1>
      <BarGraph barData={res} />
    </>
  );
}
