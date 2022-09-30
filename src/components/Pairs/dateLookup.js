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

const DateLookup = ({ range, dateRef }) => {
  const [date, setDate] = useState("");
  const [prevDate, setPrevDate] = useState("");
  const [nextDate, setNextDate] = useState("");
  const [answerGiven, setAnswerGiven] = useState(false);

  const handleDateChange = (e, isUTC = false) => {
    let date = new Date(e.target.value).toISOString();
    let unixTime = new Date(date).getTime() / 1000;
    let originalDate = e.target.value;
    setDate([date, unixTime, originalDate]);
  };

  const codeBlock = (data) => {
    const result = JSON.parse(data);
    return (
      <div className="flex flex-auto p-2 text-gray-300 bg-gray-800 rounded-lg mb-4 mt-2 overflow-auto text-xs max-w-sm sm:max-w-lg md:max-w-full  sm:text-lg lg:w-full ">
        <pre className="flex flex-col ">
          <code className="flex ">"answer": {result.answer}</code>
          <code className="flex ">
            "answeredInRound": "{result.answeredInRound}"
          </code>
          <code className="flex ">"price": {result.price}</code>
          <code className="flex ">"roundId": "{result.roundId}"</code>
          <code className="flex ">"startedAt": {result.startedAt}</code>
          <code className="flex ">"updatedAt": {result.updatedAt}</code>
        </pre>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(date[1]);
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
    // format date in this format: YYYY-MM-DDThh:mm  Mar 11, 2021
    return `${year}-${month}-${dateNum}T${hours}:${minutes}`;
  };
  const dateRange = [formatDate(range[0]), formatDate(range[1])];

  return (
    <>
      {answerGiven ? (
        <>
          <div className="flex flex-col justify-center align-middle">
            <div className="text-center my-4">
              <p>Entered Time: {date[2]}</p> <p> (Unix time: {date[1]})</p>
            </div>
            <p className="text-center">Previous Answer</p>
            {codeBlock(prevDate)}
            <p className="text-center">Next Answer</p>
            {codeBlock(nextDate)}
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
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p>Enter a date and time to find the closest on-chain answers</p>
          <input
            type="datetime-local"
            name=""
            id=""
            onChange={handleDateChange}
            required
            min={dateRange[0]}
            max={dateRange[1]}
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
              className="flex mx-auto text-stone-400 bg-stone-800 border-0 py-2 px-8 focus:outline-none hover:bg-stone-700  rounded text-lg  mt-2"
            >
              Awaiting input
            </button>
          )}
          <p>
            Date Range: {dateRange[0]} - {dateRange[1]}
          </p>
        </div>
      )}
    </>
  );
};

export { DateLookup };
