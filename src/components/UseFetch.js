import { useState, useEffect } from "react";
import { getDownloadURL } from "firebase/storage";

const useFetch = (pairRef, comparisonRef) => {
  const [data, setData] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);
  const [comparisonUrl, setComparisonUrl] = useState(null);

  useEffect(() => {
    const fetchUrl = async (ref) => {
      getDownloadURL(ref).then((res) => {
        const result = res;
        // console.log("Result is...", result);
        setUrl(result);
      });
    };
    fetchUrl(pairRef);

    console.log("UseFetch URL: ", url);

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
          console.log(err);
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, []);

  useEffect(() => {
    const fetchUrl = async (ref) => {
      getDownloadURL(ref).then((res) => {
        const result = res;
        // console.log("Result is...", result);
        setComparisonUrl(result);
      });
    };
    fetchUrl(comparisonRef);

    const abortCont = new AbortController();
    fetchUrl(comparisonRef);
    console.log("Usefetch comparison URL: ", comparisonUrl);

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
          console.log(err);
        } else {
          // auto catches network / connection error
          setIsPending(false);
          setError(err.message);
        }
      });

    // abort the fetch
    return () => abortCont.abort();
  }, []);

  return { data, isPending, error, comparisonData };
};

export default useFetch;
