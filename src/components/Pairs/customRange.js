import { formatDate, dateFormat } from "./dateLookup";
import { useState, useEffect } from "react";
import { getCustomAnswers } from "./callAnswers";
import { query, orderByChild, startAt, get, endAt } from "firebase/database";
import { unparse } from "papaparse";

const CustomRange = ({ range, dateRef, pair }) => {
  const [answerGiven, setAnswerGiven] = useState(false);
  // User input - Start and End date for the range
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  // Input range - Start and End date for the range that is created onClick and formatted
  const [inputRange, setInputRange] = useState([0, 0]);
  // Answer from the RTDB. This is a stringified JSON object of the roundIds
  const [answer, setAnswer] = useState("");
  // Final Result - This is the parsed JSON object of the roundIds
  const [result, setResult] = useState("");

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
      setInputRange([date, inputRange[1]]);
    } else {
      setEndDate([date, unixTime, originalDate, originalTime, rawDate]);
      setInputRange([inputRange[0], date]);
    }
  };

  const handleCustomRange = async (e) => {
    e.preventDefault();
    // build querey to find rounds in range
    const lookupRoundsInRange = query(
      dateRef,
      orderByChild("/startedAt"),
      startAt(new Date(inputRange[0]).getTime() / 1000),
      endAt(new Date(inputRange[1]).getTime() / 1000)
    );

    // get rounds in range
    await get(lookupRoundsInRange)
      .then(async (snapshot) => {
        if (snapshot.exists()) {
          let response = JSON.stringify(Object.values(snapshot.val()));
          // console.log("response: ", response);
          // setAnswer(response);
          // const roundIds = JSON.parse(answer).map((round) => round.roundId);
          // const customAnswer = await getCustomAnswers(roundIds, proxy, network);
          setResult(response);
          setAnswerGiven(true);
        } else {
          console.log("No data available");
          return;
        }
      })
      .catch((error) => {
        console.error(error);
        return;
      });
  };
  const codeBlock = (data, start, end) => {
    try {
      // console.log("codeblock data var: ", data);
      // console.log("codeblock start var: ", start);
      // console.log("codeblock end var: ", end);
      const result = JSON.parse(data);
      const jsonSample = result.length > 100 ? result.slice(0, 100) : result;
      const csv = unparse(result);

      return (
        <>
          <div className="flex flex-auto p-2 text-gray-300 bg-gray-800 rounded-lg mb-8 mt-2 max-h-64 overflow-auto text-xs max-w-sm sm:max-w-lg md:max-w-full  sm:text-lg lg:w-full ">
            <pre className="flex flex-col ">
              <code className="flex">
                <strong>Start Date: </strong> {start}
              </code>
              <code className="flex">
                <strong>End Date: </strong> {end}
              </code>
              <code className="flex">
                <strong>Rounds within Date Range: </strong>
                {result.length}
              </code>
              <br />
              <code className="text-left">
                <strong>Result Sample: </strong>[
                {jsonSample.map((round) => (
                  <div key={round.roundId} className="flex flex-col">
                    {JSON.stringify(round)},
                  </div>
                ))}
                ]
              </code>
            </pre>
          </div>
          <div className="flex flex-auto p-2 text-gray-300 bg-gray-800 rounded-lg mb-8 mt-2 max-h-64 overflow-auto text-xs max-w-sm sm:max-w-lg md:max-w-full  sm:text-lg lg:w-full ">
            <pre className="flex flex-col ">
              <code className="flex text-left">{csv}</code>
            </pre>
          </div>
          <div className="flex flex-row  mt-4 mb-8 ">
            <button className="mx-auto mb-4 text-gray-800 border-2 border-gray-600 rounded-md py-2 px-8 focus:outline-none hover:bg-emerald-600 hover:border-0 text-lg">
              <a
                href={`data:text/csv;charset=utf-8',${encodeURIComponent(csv)}`}
                download={`${pair}_${startDate[2]}_to_${endDate[2]}.csv`}
              >
                Download CSV
              </a>
            </button>
            <button className="mx-auto mb-4 text-gray-800 border-2 border-gray-600 rounded-md py-2 px-8 focus:outline-none hover:bg-emerald-600 hover:border-0 text-lg">
              <a
                href={`data:text/json;charset=utf-8',${encodeURIComponent(
                  data
                )}`}
                download={`${pair}_${startDate[2]}_to_${endDate[2]}.json`}
              >
                Download JSON
              </a>
            </button>
          </div>
        </>
      );
    } catch (error) {
      console.error(error);
      return (
        <div className="flex flex-auto p-2 text-gray-300 bg-gray-800 rounded-lg mb-8 mt-2 overflow-auto text-xs max-w-sm sm:max-w-lg md:max-w-full  sm:text-lg lg:w-full ">
          <pre className="flex flex-col ">
            <code className="flex ">No answer found</code>
          </pre>
        </div>
      );
    }
  };
  useEffect(() => {
    setAnswerGiven(false);
  }, [range]);

  return (
    <div>
      {answerGiven ? (
        <>
          <div className="flex flex-col justify-center align-middle max-w-xl">
            <div className="text-center my-8">
              {codeBlock(result, inputRange[0], inputRange[1])}
              <button
                className="flex mx-auto text-white bg-emerald-800 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-600 rounded text-lg"
                onClick={() => {
                  setAnswerGiven(false);
                  setInputRange([0, 0]);
                }}
              >
                Search Again
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center my-8">
          <h1 className="text-2xl my-2 font-bold text-gray-600">
            Enter a date/time range for a custom data set
          </h1>
          <h3 className="text-lg mb-6 text-gray-800">
            Samples with downloadable links below
          </h3>
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
              onClick={handleCustomRange}
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
      )}
    </div>
  );
};

export { CustomRange };
