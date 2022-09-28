import { useState } from "react";
import {
  query,
  orderByChild,
  startAt,
  limitToFirst,
  get,
} from "firebase/database";

const DateLookup = ({ data, dateRef }) => {
  const [date, setDate] = useState("");
  //   const [prevDate, setPrevDate] = useState("");
  //   const [nextDate, setNextDate] = useState("");

  const handleDateChange = (e, isUTC = false) => {
    let date = new Date(e.target.value).toISOString();
    let unixTime = new Date(date).getTime() / 1000;
    setDate([date, unixTime]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(date[1]);
    // Look up the date in RTDB. Find the closest value to the date.

    const test = query(
      dateRef,
      orderByChild("/startedAt"),
      startAt(date[1]),
      limitToFirst(1)
    );
    get(test)
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    // setPrevDate(
    //   query(dateRef, orderByChild("startedAt").endAt(date[1]).limitToLast(1))
    // );
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <p>Enter a date and time to find the closest on-chain answer</p>
        <input
          type="datetime-local"
          name=""
          id=""
          onChange={handleDateChange}
        />
        <p>Entered Date/Time: {date[0]}</p>
        <p>Unix Time: {date[1]}</p>
        <button
          onClick={handleSubmit}
          className="hover:outline-emerald-500 outline-dotted outline-2 outline-offset-2  mt-2"
        >
          Submit
        </button>
      </div>
      {/* {prevDate || nextDate ? (
        <div className="flex flex-col items-center justify-center">
          <p>Previous Date/Time: {prevDate}</p>
          <p>Next Date/Time: {nextDate}</p>
        </div>
      ) : null} */}
    </>
  );
};

export { DateLookup };
