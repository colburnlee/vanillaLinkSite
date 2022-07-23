import * as d3 from "d3";
import Header from "./components/Header";
import Navbar from "./components/Navbar";

import BTC_USD from "./data/BTC_USD_TEST.json";
import ETH_USD from "./data/ETH_USD_TEST.json";
import SNX_USD from "./data/SNX_USD_TEST.json";
// import ETHUSD from "./data/ETHUSD.json";
import SingleLineChart from "./components/SingleLineChart";

const SNX_USD_Data = { name: "SNX_USD", color: "#ffffff", items: SNX_USD };
const BTC_USD_Data = { name: "BTC_USD", color: "#d53e4f", items: BTC_USD };
const ETH_USD_Data = {
  name: "ETH_USD",
  color: "#5e4fa2",
  items: ETH_USD,
};

const dimensions = {
  width: 600,
  height: 300,
  margin: { top: 30, right: 30, bottom: 30, left: 60 },
};

function App() {
  return (
    <>
      <Navbar />
      <div className="container">
        <Header title="Lee" />
        <SingleLineChart data={ETH_USD_Data} dimensions={dimensions} />
      </div>
    </>
  );
}

export default App;
