import useFetch from "../UseFetch";
import RechartOHLCCompare from "../RechartOHLCCompare";
import { useEffect } from "react";
import { storage } from "../../firebase";
import { ref, getDownloadURL, getBytes } from "firebase/storage";

const ETHUSD = () => {
  const ETH_USD_OHLC_URL =
    "https://gist.githubusercontent.com/colburnlee/61896ce060edcb9db7cb110dd44887bd/raw/60078578b362a9883b579845bbd2490dfebbd1ee/ETH_USDT_OHLC.json";
  const ETH_USD_URL =
    "https://gist.githubusercontent.com/colburnlee/86882f86b4706370ad574ff15b292783/raw/a2f0b7e731659ca25668091ef805ad053522d071/ETH_USD.json";

  const chain = "ETH";
  const pair = "ETHUSD";

  // Build References
  const pairRef = ref(storage, `${chain}/${pair}/`);
  const pairData = ref(pairRef, `${pair}.json`);
  const OHLCData = ref(pairRef, `ETH_USD_OHLC.json`);

  // Build URLs
  const getUrl = async (reference) => {
    const url = await getDownloadURL(reference);
    return url;
  };

  // Pass in References to get URLs
  const getURL = async (pairRef, OHLCRef) => {
    const pairDataURL = await getUrl(pairData);
    const OHLCDataURL = await getUrl(OHLCData);
  };
  // Request Files from URLs
  const getFile = async (url) => {
    const file = await getBytes(url);
    return file;
  };

  const {
    error,
    isPending,
    data: pairs,
    comparisonData,
  } = useFetch(pairData, OHLCData);
  // console.log("Async Pair Data array: ", dataConstructor(pairData));
  // console.log("Async OHLC Data array: ", OHLCDataFile);

  //This UseEffect is for testing/learning how to pull files from firebase storage
  // useEffect(() => {
  //   const dataListRef = ref(storage, `${chain}/${pair}`);
  //   listAll(dataListRef).then((response) => {
  //     // console.log("Firebase Test:", response);
  //     // console.log("Firebse Storage Object:", storage);
  //     response.items.forEach((item) => {
  //       getDownloadURL(item).then((url) => {
  //         console.log(url);
  //       });
  //     });
  //   });
  // }, []);

  return (
    <section className="text-black body-font">
      <div className="container px-2 pt-24 mx-auto flex flex-wrap">
        <div className="flex flex-wrap w-full">
          {/* Div for Pair Name, Description, and Information */}
          <div className="lg:w-1/3 md:w-1/2 md:pr-10 md:py-6">
            {/* Pair Name and Loading Status */}
            <div className="flex relative pb-12">
              <div class="h-full w-1 bg-gray-800 pointer-events-none"></div>
              <div className="flex-grow pl-4">
                {error && <p className="text-5xl">{error}</p>}
                {isPending && <p className="text-5xl">Loading...</p>}
                {pairs && (
                  <p className="text-5xl"> {pairs[0]["description"]} </p>
                )}
              </div>
            </div>

            {/* General Pair Info */}
            {pairs ? (
              <>
                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-black relative z-10">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-black mb-1 tracking-wider">
                      <p>Update Parameters</p>
                    </h2>
                    <p className="leading-relaxed">
                      <p>Deviation Threshold: 0.5%</p>
                      <p>Heartbeat: 60 minutes</p>
                    </p>
                  </div>
                </div>

                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-black relative z-10">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-black mb-1 tracking-wider">
                      Data Set Information
                    </h2>
                    <p>
                      Start Date:{" "}
                      {new Date(pairs[0]["updatedAtUTC"]).toLocaleDateString(
                        "en-us"
                      )}
                    </p>
                    <p>
                      Updates to Blockchain:{" "}
                      {pairs.length.toLocaleString(undefined, {
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-black relative z-10">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 17l4 4 4-4m-4-5v9"></path>
                      <path d="M20.88 18.09A5 5 0 0018 9h-1.26A8 8 0 103 16.29"></path>
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-black mb-1 tracking-wider">
                      Download Dataset
                    </h2>
                    <p className="leading-relaxed">JSON </p>
                    <p>CSV</p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-xl">Pair information Loading</p>
            )}
          </div>
          <div className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12">
            {pairs && comparisonData ? (
              // <ManualLineChart data={pairs} width={900} height={600} />
              <RechartOHLCCompare
                comparisonData={comparisonData}
                data={pairs}
                width={1000}
                height={600}
              />
            ) : (
              <p className="text-2xl">"Pair information Loading"</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ETHUSD;

// "description":"ETH / USD","decimals":8,"roundId":"55340232221128654863","answer":"39178992539","price":"391.79","startedAtUnix":"1596808126","startedAtUTC":"2020-08-07T13:48:46.000Z","updatedAtUnix":"1596809830","updatedAtUTC":"2020-08-07T14:17:10.000Z","answeredInRound":"55340232221128654849"
