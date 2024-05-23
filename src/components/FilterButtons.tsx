"use client";

import { useState } from "react";

enum Filter {
  AllTime = "All Time",
  Last3Months = "Last 3 Months",
  LastMonth = "Last Month",
}

export function FilterButtons({
  data,
  setData,
}: {
  data: { allTime: any; last3Months: any; lastMonth: any };
  setData: (data: any) => void;
}) {
  const [active, setActive] = useState(Filter.AllTime);
  return (
    <div
      className="inline-flex justify-center rounded-md shadow-sm"
      role="group"
    >
      <FilterButton
        data={data.allTime}
        setData={setData}
        filter={Filter.AllTime}
        active={active}
        setActive={setActive}
      />
      <FilterButton
        data={data.last3Months}
        setData={setData}
        filter={Filter.Last3Months}
        active={active}
        setActive={setActive}
      />
      <FilterButton
        data={data.lastMonth}
        setData={setData}
        filter={Filter.LastMonth}
        active={active}
        setActive={setActive}
      />
    </div>
  );
}

const FilterButton = ({ setData, setActive, filter, data, active }: any) => {
  return (
    <button
      onClick={() => {
        setData(data);
        setActive(filter);
      }}
      type="button"
      className={`px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:text-blue-700 ${active === filter ? " text-blue-600" : ""}`}
    >
      {filter}
    </button>
  );
};
