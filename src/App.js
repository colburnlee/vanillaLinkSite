import Navbar from "./components/Navbar";
import Landing from "./components/Pages/Landing";
import About from "./components/Pages/About";
import Introduction from "./components/Pages/Introduction";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pair from "./components/Pages/Pair";
// import ETHUSD from "./components/ETH/ETHUSD";

function App() {
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-r from-gray-200 to-emerald-50">
        <div className="Navbar">
          <Navbar />
        </div>

        <div className="Content px-2 ">
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route
              exact
              path="/introduction"
              element={<Introduction />}
            ></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route
              exact
              path="/introduction"
              element={<Introduction />}
            ></Route>
            <Route
              exact
              path="/ETH/ETHUSD"
              element={
                <Pair
                  chain={"ETH"}
                  pair={"ETHUSD"}
                  deviationThreshold={0.5}
                  heartbeat={1}
                  proxyAddress={"0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"}
                />
              }
            ></Route>
            <Route
              exact
              path="/ETH/BTCUSD"
              element={
                <Pair
                  chain={"ETH"}
                  pair={"BTCUSD"}
                  deviationThreshold={0.5}
                  heartbeat={1}
                  proxyAddress={"0xF4030086522a5bEEa4988F8cA5B36dbC97BeE88c"}
                />
              }
            ></Route>
          </Routes>
        </div>
      </div>
      <div className="Footer sticky top-[100vh]">
        <Footer />
      </div>
    </Router>
  );
}

export default App;
