import { useState, useEffect } from "react";
import { storage } from "../../firebase.config";
import { ref, getDownloadURL } from "firebase/storage";
import useAxios from "../useAxios";
import OHLChart from "../OHLChart";
import { Settings, Link, Download, LoadingWheel } from "../Icons";
import { truncateEthAddress } from "../addressFormatter";
import PropTypes from "prop-types";

const Pair = ({ chain, pair, deviationThreshold, heartbeat, proxyAddress }) => {
  // Declare the initial state variable types for the chart
  Pair.propTypes = {
    chain: PropTypes.string,
    pair: PropTypes.string,
    deviationThreshold: PropTypes.number,
    heartbeat: PropTypes.number,
    proxyAddress: PropTypes.string,
  };

  // Set the initial state variables for the chart
  const [chartUrl, setChartUrl] = useState(null);
  const [JSONfileUrl, setJSONFileUrl] = useState(null);
  const [CSVfileUrl, setCSVFileUrl] = useState(null);
  const [updateCount, setUpdateCount] = useState(null);

  // Build References
  const pairRef = ref(storage, `${chain}/${pair}/`);
  const chartRef = ref(pairRef, `${pair}Chart.json`);
  const jsonFileRef = ref(pairRef, `${pair}.json`);
  const csvFileRef = ref(pairRef, `${pair}.csv`);

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
  const { data: chartData } = useAxios(chartUrl);

  useEffect(() => {
    if (chartData) {
      const updateCount = chartData.map((chartData) => chartData.Updates);
      const totalUpdates = updateCount.reduce((a, b) => a + b);

      setUpdateCount(
        totalUpdates.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
    }
  }, [chartData, chartUrl]);

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
                      <>
                        <a
                          href={"https://etherscan.io/address/" + proxyAddress}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {" "}
                          {truncateEthAddress(proxyAddress)}
                        </a>
                      </>
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
                    <>
                      <a
                        href={JSONfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p className="leading-relaxed"> JSON file</p>
                      </a>
                    </>

                    <>
                      <a
                        href={CSVfileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <p>CSV file</p>
                      </a>
                    </>
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
                <LoadingWheel />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pair;
