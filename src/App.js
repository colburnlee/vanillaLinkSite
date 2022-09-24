import Navbar from "./components/Navbar";
import Landing from "./components/Pages/Landing";
import About from "./components/Pages/About";
import Introduction from "./components/Pages/Introduction";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RtdbPair from "./components/Pages/RtdbPair";
// import ETHUSD from "./components/ETH/ETHUSD";

function App() {
  return (
    <Router>
      <div className="Navbar">
        <Navbar />
      </div>
      <div className="Content   ">
        <div className="App min-h-screen bg-gradient-to-r from-gray-200 to-emerald-50  ">
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
              element={<RtdbPair chain={"ETH"} pair={"ETHUSD"} />}
            ></Route>
            <Route
              exact
              path="/ETH/BTCUSD"
              element={<RtdbPair chain={"ETH"} pair={"BTCUSD"} />}
            ></Route>
          </Routes>
        </div>
        <div className="Footer sticky top-[100vh]">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
