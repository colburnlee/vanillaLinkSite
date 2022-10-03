import { useState } from "react";
import {
  query,
  orderByChild,
  startAt,
  limitToFirst,
  get,
  endAt,
  limitToLast,
} from "firebase/database";
import { useEffect } from "react";

const DateLookup = ({ range, dateRef }) => {
  const [date, setDate] = useState("");
  const [prevDate, setPrevDate] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [answerGiven, setAnswerGiven] = useState(false);

  const dateFormat = {
    day: "numeric", // numeric, 2-digit
    year: "numeric", // numeric, 2-digit
    month: "short", // numeric, 2-digit, long, short, narrow
    timeZone: "UTC",
  };

  const handleDateChange = (e) => {
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
    setDate([date, unixTime, originalDate, originalTime, rawDate]);
  };

  const codeBlock = (data, inputTime) => {
    const result = JSON.parse(data);
    const timeDiff = Math.abs(result.startedAt - inputTime);
    return (
      <div className="flex flex-auto p-2 text-gray-300 bg-gray-800 rounded-lg mb-8 mt-2 overflow-auto text-xs max-w-sm sm:max-w-lg md:max-w-full  sm:text-lg lg:w-full ">
        <pre className="flex flex-col ">
          <code className="flex ">"answer": {result.answer}</code>
          <code className="flex ">
            "answeredInRound": "{result.answeredInRound}"
          </code>
          <code className="flex ">"price": {result.price}</code>
          <code className="flex ">"roundId": "{result.roundId}"</code>
          <code className="flex ">"startedAt": {result.startedAt}</code>
          <code className="flex ">"updatedAt": {result.updatedAt}</code>
          <br />
          <code className="flex ">Goal: {inputTime}</code>
          <code className="flex ">Time Difference: {timeDiff} seconds</code>
          <code className="flex ">
            Time Difference: {(timeDiff / 60).toFixed(2)} minutes
          </code>
          <code className="flex ">
            Time Difference: {(timeDiff / 3600).toFixed(2)} hours
          </code>
        </pre>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Look up the date in RTDB. Find the closest value to the date.

    const lookupNextDate = query(
      dateRef,
      orderByChild("/startedAt"),
      startAt(date[1]),
      limitToFirst(1)
    );
    await get(lookupNextDate)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let answer = JSON.stringify(Object.values(snapshot.val())[0]);
          setNextDate(answer);
        } else {
          console.log("No data available");
          return;
        }
      })
      .catch((error) => {
        console.error(error);
      });

    const lookupPrevDate = query(
      dateRef,
      orderByChild("/startedAt"),
      endAt(date[1]),
      limitToLast(1)
    );
    await get(lookupPrevDate)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let answer = JSON.stringify(Object.values(snapshot.val())[0]);
          setPrevDate(answer.toString());
        } else {
          console.log("No data available");
          return;
        }
      })
      .catch((error) => {
        console.error(error);
        return;
      });
    setAnswerGiven(true);
  };

  const formatDate = (date) => {
    let dateObj = new Date(date);
    let year = dateObj.getFullYear();
    let month = dateObj.getMonth() + 1;
    month = month < 10 ? "0" + month : month;
    let dateNum = dateObj.getDate();
    dateNum = dateNum < 10 ? "0" + dateNum : dateNum;
    let hours = dateObj.getHours();
    hours = hours < 10 ? "0" + hours : hours;
    let minutes = dateObj.getMinutes();
    minutes = minutes < 10 ? "0" + minutes : minutes;
    // format date in this format: YYYY-MM-DDThh:mm
    return `${year}-${month}-${dateNum}T${hours}:${minutes}`;
  };
  const dateRange = [formatDate(range[0]), formatDate(range[1])];

  useEffect(() => {
    setAnswerGiven(false);
  }, [range]);

  return (
    <>
      {answerGiven ? (
        <>
          <div className="flex flex-col justify-center align-middle">
            <div className="text-center my-8">
              <h2 className="text-2xl font-bold text-gray-600">
                Time Entered: {date[4]}
              </h2>
              <h2 className="text-2xl font-bold text-gray-600">
                UTC: {date[2]} {date[3]}
              </h2>
              <h2 className="text-2xl font-bold text-gray-600">
                Unix time: {date[1]}
              </h2>
            </div>
            <div className="flex flex-col justify-center align-middle">
              <div className="text-center my-8">
                <h2 className="text-2xl font-bold text-gray-600">
                  Closest Answer Previous to Date:
                </h2>
                {codeBlock(prevDate, date[1])}

                <h2 className="text-2xl font-bold text-gray-600">
                  Closest Answer After Date:
                </h2>

                {codeBlock(nextDate, date[1])}
                <button
                  className="flex mx-auto text-white bg-emerald-800 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-600 rounded text-lg"
                  onClick={() => {
                    setAnswerGiven(false);
                    setPrevDate("");
                    setNextDate("");
                    setDate("");
                  }}
                >
                  Search Again
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center my-8">
          <h1 className="text-2xl font-bold text-gray-600">
            Enter a date and time to find the closest answer posted to the
            chainlink oracle.
          </h1>

          <input
            type="datetime-local"
            onChange={handleDateChange}
            required
            min={dateRange[0]}
            max={dateRange[1]}
            className="flex mx-auto text-white bg-emerald-800 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-600 rounded text-lg my-4"
          />

          {date ? (
            <button
              onClick={handleSubmit}
              className="flex mx-auto text-white bg-emerald-800 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-600 rounded text-lg  mt-2"
            >
              Submit
            </button>
          ) : (
            <button
              disabled={true}
              className="flex mx-auto text-stone-400 border-slate-600 py-2 px-8  hover:bg-stone-700  rounded text-lg  mt-2"
            >
              Awaiting input
            </button>
          )}
        </div>
      )}
    </>
  );
};

export { DateLookup };
