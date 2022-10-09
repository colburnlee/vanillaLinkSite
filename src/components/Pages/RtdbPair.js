import { useState, useEffect } from "react";
import { storage } from "../../firebase/firebase.config"; // add: rtdb
import { ref, getDownloadURL, getMetadata } from "firebase/storage";
import useAxios from "../useAxios";
import OHLChart from "../Pairs/OHLChart";
import { Settings, Link, Download, LoadingWheel } from "../Icons";
import { truncateEthAddress } from "../addressFormatter";
import PropTypes from "prop-types";
import { get, ref as ref_rtdb } from "firebase/database";
import { rtdb } from "../../firebase/firebase.config";
import { TimeUnitPanel } from "../Pairs/timeUnitPanel";
import { ChartSelect } from "../Pairs/chartSelect";
import { UpdateHistoryChart } from "../Pairs/UpdateHistoryChart";
import { JSONSnippet } from "../Pairs/JSONSnippet";
import { CSVSnippet } from "../Pairs/CSVSnippet";
import { DateLookup } from "../Pairs/dateLookup";
import { RoundsInRange } from "../Pairs/roundsInRange";
import { CustomRange } from "../Pairs/customRange";
import prettyBytes from "pretty-bytes";

const Pair = ({ chain, pair }) => {
  // Declare the initial state variable types for the chart
  Pair.propTypes = {
    chain: PropTypes.string,
    pair: PropTypes.string,
  };

  // Set the initial state variables for the chart
  const [chartUrl, setChartUrl] = useState(null);
  const [JSONfileUrl, setJSONFileUrl] = useState(null);
  const [JSONfileMetadata, setJSONFileMetadata] = useState(null);
  const [CSVfileUrl, setCSVFileUrl] = useState(null);
  const [CSVfileMetadata, setCSVFileMetadata] = useState(null);
  const [updateCount, setUpdateCount] = useState(null);
  const [chartKey, setChartKey] = useState(0);
  const [proxyAddress, setProxyAddress] = useState(null);
  const [deviationThreshold, setDeviationThreshold] = useState(null);
  const [heartbeat, setHeartbeat] = useState(null);
  const [latestRound, setLatestRound] = useState(null);
  const [selectedTime, setSelectedTime] = useState(90);
  const [selectedChart, setSelectedChart] = useState("priceHistory");
  const [dateRange, setDateRange] = useState(null);
  const [network, setNetwork] = useState(null);

  // Build Storage References
  const pairRef = ref(storage);
  const chartRef = ref(pairRef, `ohlChart/${chain}_${pair}.json`);
  const jsonFileRef = ref(pairRef, `data/${chain}_${pair}.json`);
  const csvFileRef = ref(pairRef, `csv/${chain}_${pair}.csv`);

  // Build RTDB References
  const rtdbRef = ref_rtdb(rtdb, `oracles/${chain}_${pair}`);
  const dateRef = ref_rtdb(rtdb, `data/${chain}_${pair}`);

  // Get data for chart
  let chartData = null;
  ({ data: chartData } = useAxios(chartUrl));

  // const rangeChange = (e) => {
  //   setTimeRange([e.startIndex, e.endIndex]);
  //   console.log(e.startIndex);
  // };

  const timeChange = (f) => {
    setSelectedTime(f);
    setChartKey((prev) => prev + 1);
  };

  const chartChange = (f) => {
    setSelectedChart(f.value);
    setChartKey((prev) => prev + 1);
  };

  useEffect(() => {
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

    // JSON File Metadata
    getMetadata(jsonFileRef)
      .then((res) => {
        setJSONFileMetadata(prettyBytes(res.size));
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

    // CSV File Metadata
    getMetadata(csvFileRef)
      .then((res) => {
        setCSVFileMetadata(prettyBytes(res.size));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chartRef, jsonFileRef, csvFileRef]);

  // Set chart data
  useEffect(() => {
    if (chartData) {
      const updateCount = chartData.map((chartData) => chartData.updateCount);
      const totalUpdates = updateCount.reduce((a, b) => a + b);
      const roundsInDay = chartData[chartData.length - 1].roundsInDay;
      const latestRound = roundsInDay
        ? roundsInDay[roundsInDay.length - 1]
        : null;

      setUpdateCount(
        totalUpdates.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      );
      setLatestRound(latestRound);
      setSelectedTime(90);
      // setSelectedChart("priceHistory");
      setDateRange([chartData[0].date, chartData[chartData.length - 1].date]); // YYYY-MM-DDThh:mm  Mar 11, 2021
    }
  }, [chartData]);

  useEffect(() => {
    // get the data from the RTDB
    get(rtdbRef).then((snapshot) => {
      if (snapshot.exists()) {
        setProxyAddress(snapshot.val().proxyAddress);
        setDeviationThreshold(snapshot.val().deviationThreshold);
        setHeartbeat(snapshot.val().heartbeat);
        setNetwork(snapshot.val().chain);
      } else {
        console.log("No rtdb data available");
      }
    });
  }, [rtdbRef]);

  return (
    <section className="text-black py-20 body-font w-full bg-background-light flex grow justify-evenly align-middle ">
      <div className="container pt-28 flex rounded-xl border border-foreground-alt-500 shadow pb-4 sm:p-8 px-2  mx-1  justify-evenly align-middle">
        <div className="flex flex-wrap h-full w-full justify-center align-middle items-center">
          {/* Div for Pair Name, Description, and Information */}
          <div className="lg:w-1/3 md:w-1/3 md:px-4 md:py-6 ">
            {/* Pair Name and Loading Status */}
            <div className="flex relative pb-12">
              <h1 className="pl-4 font-semibold text-5xl title-font text-gray-900 ">
                {pair}
              </h1>
            </div>

            {/* General Pair Info */}
            {chartData ? (
              <>
                <div className="flex relative pb-12">
                  <div className="w-10 absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-full bg-gray-800 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-black relative z-10">
                    <Settings />
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className=" font-semibold text-xl title-font text-gray-900">
                      Update Parameters
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
                    <h2 className="font-semibold text-xl title-font text-gray-900">
                      Oracle Information
                    </h2>
                    <p>Start Date: {chartData[0].date}</p>
                    {/* <p>Decimals: {decimals} </p> */}

                    <p>Updates to Blockchain: {updateCount} </p>
                    <p>Latest Round on Record: {latestRound}</p>
                    <p className="leading-relaxed">
                      Proxy Contract Address:
                      {proxyAddress ? (
                        <a
                          href={"https://etherscan.io/address/" + proxyAddress}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold hover:text-emerald-600 focus:text-emerald-600 hover:font-bold"
                        >
                          {" "}
                          {truncateEthAddress(proxyAddress)}
                        </a>
                      ) : (
                        <p>Not Available</p>
                      )}
                    </p>
                    {/* <p>last round info: {latestRound}</p> */}
                  </div>
                </div>

                <div className="flex relative pb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-black relative z-10">
                    <Download />
                  </div>
                  <div className="flex-grow pl-4 ">
                    <h2 className="font-semibold text-xl title-font text-gray-900">
                      Download Complete Dataset
                    </h2>
                    <ul className="leading-relaxed">
                      <li>(Updated Daily at 00:00 UTC)</li>
                    </ul>

                    <a
                      href={JSONfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row items-center "
                    >
                      <p className="font-semibold hover:text-emerald-600 hover:font-bold focus:text-emerald-600 mr-1">
                        JSON file
                      </p>
                      <p className="text-xs mt-1">({JSONfileMetadata})</p>
                    </a>

                    <a
                      href={CSVfileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-row items-center "
                    >
                      <p className="font-semibold  hover:text-emerald-600 hover:font-bold focus:text-emerald-600 mr-1 ">
                        CSV file
                      </p>
                      <p className="text-xs mt-1 "> ({CSVfileMetadata})</p>
                    </a>
                  </div>
                </div>
              </>
            ) : (
              <>
                <p className="text-xl">Pair information Loading</p>
              </>
            )}
          </div>
          <div className="lg:w-2/3 md:w-5/6 md:pr-2 md:py-2 rounded-lg md:px-4 flex-col md:mt-0 mt-12 w-full justify-end object-cover">
            {chartData ? (
              <>
                <div className="flex justify-between items-end">
                  <ChartSelect chartChange={chartChange} />
                  {(selectedChart === "priceHistory" ||
                    selectedChart === "updateHistory") && (
                    <TimeUnitPanel timeChange={timeChange} />
                  )}
                </div>
                <div className="relative flex grow justify-center">
                  {selectedChart === "DateLookup" && (
                    <DateLookup range={dateRange} dateRef={dateRef} />
                  )}

                  {selectedChart === "priceHistory" && (
                    <OHLChart
                      data={chartData}
                      description={pair}
                      // rangeChange={rangeChange}
                      margin={{ top: 10, right: 10, left: 5, bottom: 10 }}
                      key={chartKey}
                      selectedTime={selectedTime}
                    />
                  )}
                  {selectedChart === "updateHistory" && (
                    <UpdateHistoryChart
                      data={chartData}
                      description={pair}
                      // rangeChange={rangeChange}
                      margin={{ top: 10, right: 10, left: 5, bottom: 10 }}
                      key={chartKey}
                      selectedTime={selectedTime}
                    />
                  )}
                  {selectedChart === "roundsInRange" && (
                    <RoundsInRange
                      range={dateRange}
                      dateRef={dateRef}
                      network={network}
                      proxy={proxyAddress}
                    />
                  )}
                  {selectedChart === "customRange" && (
                    <CustomRange
                      range={dateRange}
                      dateRef={dateRef}
                      pair={pair}
                    />
                  )}
                </div>

                <div className="flex flex-shrink">
                  {selectedChart === "JSONExample" && <JSONSnippet />}
                  {selectedChart === "CSVExample" && <CSVSnippet />}
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center">
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
