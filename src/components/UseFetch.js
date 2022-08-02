import { useState, useEffect } from "react";

const useFetch = (url, comparisonUrl) => {
  const [data, setData] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setIsPending(false);
        // console.log(data[0].price);
        setData(data);
        // console.log(data)
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [url]);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(comparisonUrl, { signal: abortCont.signal })
      .then((res) => {
        if (!res.ok) {
          // error coming back from server
          throw Error("could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((comparisonData) => {
        setIsPending(false);
        // console.log(data[0].price);
        setComparisonData(comparisonData);
        // console.log(comparisonData);
        setError(null);
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, [comparisonUrl]);

  return { data, isPending, error, comparisonData };
};

export default useFetch;
