import { useState, useEffect } from "react";
import { storage } from "../../firebase.config";
import { ref, getDownloadURL } from "firebase/storage";
import useAxios from "../useAxios";
import OHLChart from "../OHLChart";
import { Settings, Link, Download } from "../Icons";
import { truncateEthAddress } from "../addressFormatter";

const ETHUSD = () => {
  // Set the initial variables for the chain and pair
  const chain = "ETH";
  const pair = "ETHUSD";
  const deviationThreshold = 0.5; // 0.5% deviation from the previous price
  const heartbeat = 1; // 1 hour heartbeat
  const proxyAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419";

  // Set the initial state variables for the chart
  const [chartUrl, setChartUrl] = useState(null);
  const [JSONfileUrl, setJSONFileUrl] = useState(null);
  const [CSVfileUrl, setCSVFileUrl] = useState(null);
  const [updateCount, setUpdateCount] = useState(null);

  // Build References
  const pairRef = ref(storage, `${chain}/${pair}/`);
  const chartRef = ref(pairRef, `${pair}Chart.json`);
  const jsonFileRef = ref(pairRef, `${pair}.json`);
  const csvFileRef = ref(pairRef, `${pair}_CSV.csv`);

  // Pass in References to get URLs
  // Chart URL
  getDownloadURL(chartRef)
    .then((res) => {
      setChartUrl(res);
    })
    .catch((err) => {
      console.log(err);
    });

  // JSON File URL
  getDownloadURL(jsonFileRef)
    .then((res) => {
      setJSONFileUrl(res);
    })
    .catch((err) => {
      console.log(err);
    });

  // CSV File URL
  getDownloadURL(csvFileRef)
    .then((res) => {
      setCSVFileUrl(res);
    })
    .catch((err) => {
      console.log(err);
    });

  // Get data for chart
  const { data: chartData, isPending: chartDataPending } = useAxios(chartUrl);

  useEffect(() => {
    if (chartData) {
      const updateCount = chartData.map((chartData) => chartData.Updates);
      const totalUpdates = updateCount.reduce((a, b) => a + b);

      setUpdateCount(
        totalUpdates.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    }
  }, [chartData]);

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
                {chartDataPending && <p className="text-5xl">Loading...</p>}
                {chartData && <p className="text-5xl"> {pair} </p>}
              </div>
            </div>

            {/* General Pair Info */}
            {chartData ? (
              <>
                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-black relative z-10">
                    <Settings />
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-black mb-1 tracking-wider">
                      <p>Update Parameters</p>
                    </h2>
                    <ul className="leading-relaxed">
                      <li>Deviation Threshold: {deviationThreshold}%</li>
                      <li>
                        Heartbeat: {heartbeat} {heartbeat <= 1 ? "hr" : "hrs"}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex relative pb-12 ">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-black relative z-10">
                    <Link />
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-black mb-1 tracking-wider">
                      Data Set Information
                    </h2>
                    <p>Start Date: {chartData[0].date}</p>
                    <p>Updates to Blockchain: {updateCount} </p>
                    <p className="leading-relaxed">
                      Proxy Contract Address:
                      {proxyAddress ? (
                        <>
                          <a
                            href={
                              "https://etherscan.io/address/" + proxyAddress
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" "}
                            {truncateEthAddress(proxyAddress)}
                          </a>
                        </>
                      ) : (
                        "Not available"
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-black relative z-10">
                    <Download />
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-black mb-1 tracking-wider">
                      Download Dataset
                    </h2>
                    {JSONfileUrl ? (
                      <>
                        <a
                          href={JSONfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <p className="leading-relaxed"> JSON file</p>
                        </a>
                      </>
                    ) : (
                      <p className="leading-relaxed">No JSON File</p>
                    )}
                    {CSVfileUrl ? (
                      <>
                        <a
                          href={CSVfileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <p>CSV file</p>
                        </a>
                      </>
                    ) : (
                      <p className="leading-relaxed">No CSV File</p>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-xl">Pair information Loading</p>
              </>
            )}
          </div>
          <div className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12 text-center relative">
            {chartData ? (
              <OHLChart
                data={chartData}
                width={1200}
                height={800}
                description={pair}
              />
            ) : (
              <div className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12 text-center relative">
                <svg
                  role="status"
                  className="inline h-8 w-8 animate-spin mr-2 text-gray-200 dark:text-gray-600 fill-emerald-600 self-center"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ETHUSD;
