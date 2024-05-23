export function FilterButtons({
  data,
  setData,
}: {
  data: { allTime: any; last3Months: any; lastMonth: any };
  setData: (data: any) => void;
}) {
  return (
    <div className="flex gap-4 justify-center">
      <button onClick={() => setData(data.allTime)}>All Time</button>
      <button onClick={() => setData(data.last3Months)}>Last 3 Months</button>
      <button onClick={() => setData(data.lastMonth)}>Last Month</button>
    </div>
  );
}
