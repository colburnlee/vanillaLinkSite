import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import About from "./About";
import Introduction from "./Introduction";
import ETHUSD from "./components/ETH/ETHUSD";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { storage } from "./firebase";
import { ref, list } from "firebase/storage";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

function App() {
  console.log(storage);
  const filesListRef = ref(storage, "/test");
  console.log(list(filesListRef));
  return (
    <Router>
      <div className="App min-h-screen bg-gradient-to-r from-gray-200 to-emerald-50">
        <div className="Navbar">
          <Navbar />
        </div>

        <div className="Content px-2 ">
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
      <div className="Footer sticky top-[100vh]">
        <Footer />
      </div>
    </Router>
  );
}

export default App;
