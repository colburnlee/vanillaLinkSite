import { Link } from "react-router-dom";
import { VerticalHexigon } from "./Icons";

const Navbar = () => {
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="sticky top-0  container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <VerticalHexigon />
          <span className="ml-3 text-xl">Link to the Past</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <Link to="/introduction" className="mr-5 hover:text-white">
            Introduction
          </Link>
          <Link to="/about" className="mr-5 hover:text-white">
            About
          </Link>
          <Link to="/ETH/ETHUSD" className="mr-5 hover:text-white">
            ETH-USD
          </Link>
          <Link to="/ETH/BTCUSD" className="mr-5 hover:text-white">
            BTC-USD
          </Link>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
