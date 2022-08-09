import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import About from "./About";
import Introduction from "./Introduction";
import ETHUSD from "./components/ETH/ETHUSD";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="Navbar">
          <Navbar />
        </div>

        <div className="Content bg-white pt-8 px-8">
          <Routes>
            <Route path="/" element={<Landing />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route
              exact
              path="/introduction"
              element={<Introduction />}
            ></Route>
            <Route exact path="/ETH/ETHUSD" element={<ETHUSD />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
