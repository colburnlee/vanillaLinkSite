import { formatDate, dateFormat } from "./dateLookup";
import { useState } from "react";

const CustomRange = ({ range, onChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const dateRange = [formatDate(range[0]), formatDate(range[1])];

  const handleDateChange = (e, isStart = true) => {
    let rawDate = e.target.value;
    let date = new Date(e.target.value).toISOString();
    let unixTime = new Date(date).getTime() / 1000;
    let originalDate = new Date(unixTime * 1000)
      .toLocaleString("en-US", dateFormat)
      .toString();
    let originalTime = new Date(unixTime * 1000).toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
    if (isStart) {
      setStartDate([date, unixTime, originalDate, originalTime, rawDate]);
    } else {
      setEndDate([date, unixTime, originalDate, originalTime, rawDate]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <h1 className="text-2xl my-4 font-bold text-gray-600">
        Enter a date/time range
      </h1>
      <div className="flex flex-row justify-between align-middle">
        <div className="flex flex-col mr-4 align-middle">
          <h2 className="text-2xl font-bold text-gray-600">Start Date</h2>
          <input
            type="datetime-local"
            className="border-2 border-gray-600 rounded-md p-2"
            onChange={(e) => handleDateChange(e)}
            min={dateRange[0]}
            max={dateRange[1]}
          />
        </div>
        <div className="flex flex-col  align-middle">
          <h2 className="text-2xl font-bold text-gray-600">End Date</h2>
          <input
            type="datetime-local"
            className="border-2 border-gray-600 rounded-md p-2"
            onChange={(e) => handleDateChange(e, false)}
            min={formatDate(startDate[0])}
            max={dateRange[1]}
          />
        </div>
      </div>
      {startDate && endDate ? (
        <button
          className="flex mx-auto text-white bg-emerald-800 border-0 my-2 py-2 px-8 focus:outline-none hover:bg-emerald-600 rounded text-lg"
          onClick={handleSubmit}
        >
          Search
        </button>
      ) : (
        <button
          className="flex mx-auto text-slate-600 border-slate-600 py-2 px-8 bg-stone-400  hover:bg-stone-700 hover:text-white rounded text-lg  mt-2  "
          disabled
        >
          Awaiting Input
        </button>
      )}
    </div>
  );
};

export { CustomRange };
