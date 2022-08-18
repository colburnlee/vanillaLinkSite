import { useEffect, useState } from "react";
import axios from "axios";

function useAxios(url) {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    axios
      .get(url, { signal: abortCont.signal })
      .then((res) => {
        setIsPending(false);
        setData(res.data);
        setError(null);
        console.log("UseAxios Pull Successful");
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
    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, error };
}
export default useAxios;
