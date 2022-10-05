import { useState, useEffect } from "react";
import { query, orderByChild, startAt, get, endAt } from "firebase/database";
// import { getCustomAnswers } from "./callAnswers";

const RoundsInRange = ({ range, dateRef, network, proxy }) => {
  const [answerGiven, setAnswerGiven] = useState(false);
  const [inputRange, setInputRange] = useState([0, 0]);
  const [answer, setAnswer] = useState(0);
  // const [customRange, setCustomRange] = useState(false);

  //convert date to 2023-06-03 format
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

  const codeBlock = (data, start, end) => {
    try {
      // console.log("codeblock data var: ", data);
      // console.log("codeblock start var: ", start);
      // console.log("codeblock end var: ", end);
      const result = JSON.parse(data);

      return (
        <div className="flex flex-auto p-2 text-gray-300 bg-gray-800 rounded-lg mb-8 mt-2 max-h-96 overflow-auto text-xs max-w-sm sm:max-w-lg md:max-w-full  sm:text-lg lg:w-full ">
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
              <strong>Result RoundIds: </strong>
              {result.map((round) => round.roundId + ", ")}
            </code>
          </pre>
        </div>
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Look up the date in RTDB. Find the closest value to the date.
    // convert input dates to datetime format
    const inputUnixRange = [
      new Date(inputRange[0]).getTime() / 1000,
      new Date(inputRange[1]).getTime() / 1000,
    ];

    // build querey to find rounds in range
    const lookupRoundsInRange = query(
      dateRef,
      orderByChild("/startedAt"),
      startAt(inputUnixRange[0]),
      endAt(inputUnixRange[1])
    );

    // get rounds in range
    await get(lookupRoundsInRange)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let response = JSON.stringify(Object.values(snapshot.val()));
          // console.log("response: ", response);
          setAnswer(response);
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
  // const handleCustomRange = async () => {
  //   const roundIds = JSON.parse(answer).map((round) => round.roundId);
  //   console.log("roundIds: ", roundIds);
  //   const customAnswer = await getCustomAnswers(roundIds, network, proxy);

  //   setCustomRange(customAnswer);
  // };

  useEffect(() => {
    setAnswerGiven(false);
  }, [range]);

  return (
    <div>
      {answerGiven ? (
        <>
          <div className="flex flex-col justify-center align-middle">
            <div className="text-center my-8">
              {codeBlock(answer, inputRange[0], inputRange[1])}
              <button
                className="flex mx-auto text-white bg-emerald-800 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-600 rounded text-lg"
                onClick={() => {
                  setAnswerGiven(false);
                  setInputRange([0, 0]);
                }}
              >
                Search Again
              </button>
              {/* <button
                className="flex mx-auto text-white bg-emerald-800 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-600 rounded text-lg mt-4"
                onClick={() => {
                  handleCustomRange();
                }}
              >
                Get Round Answers from blockchain
              </button> */}
            </div>
            {/* {customRange} */}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center my-8">
          <h1 className="text-2xl my-4 font-bold text-gray-600">
            Enter a date/time range for a list of roundIds
          </h1>
          <div className="flex flex-row justify-between align-middle">
            <div className="flex flex-col mr-4 align-middle">
              <h2 className="text-2xl font-bold text-gray-600">Start Date</h2>
              <input
                type="datetime-local"
                className="border-2 border-gray-600 rounded-md p-2"
                onChange={(e) => setInputRange([e.target.value, inputRange[1]])}
                min={dateRange[0]}
                max={dateRange[1]}
              />
            </div>
            <div className="flex flex-col  align-middle">
              <h2 className="text-2xl font-bold text-gray-600">End Date</h2>
              <input
                type="datetime-local"
                className="border-2 border-gray-600 rounded-md p-2"
                onChange={(e) => setInputRange([inputRange[0], e.target.value])}
                min={inputRange[0]}
                max={dateRange[1]}
              />
            </div>
          </div>
          {inputRange[0] !== 0 && inputRange[1] !== 0 ? (
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
      )}
    </div>
  );
};

export { RoundsInRange };
