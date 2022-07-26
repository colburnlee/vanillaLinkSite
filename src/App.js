import * as d3 from "d3";
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import About from "./About";
import Introduction from "./Introduction"
import ETHUSD from "./components/ETH/ETHUSD";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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
    <Router>
      <div className="App">

        <div className="Navbar">
          <Navbar />
        </div>

        <div className="Content">
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/introduction" element={<Introduction />}></Route>
            <Route exact path="/ETH/ETHUSD" element={<ETHUSD />}></Route>

          </Routes>
        </div>

      </div>
    </Router>
  );
}

export default App;
