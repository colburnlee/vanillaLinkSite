import { Link } from "react-router-dom";

const navigation = [
  { name: "Introduction", href: "/introduction", current: true },
  { name: "ETH-USD", href: "/ETH/ETHUSD", current: false },
  { name: "Optimism", href: "#", current: false },
  { name: "Arbitrum", href: "#", current: false },
  { name: "About Us", href: "/about", current: false },
];

const Navbar = () => {
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          to="/"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-10 h-10 text-white p-2 bg-emerald-600 rounded-full"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-2.995 2.995-7.486 4-11 4 0 8.583 5.068 16.097 11 20 5.932-3.903 11-11.417 11-20-3.514 0-8.005-1.005-11-4zm-7.376 12h7.376v-9.356c2.965 2.238 6.457 3.004 8.912 3.25-.204 2.191-.755 4.236-1.536 6.106h-7.376v9.549c-2.771-2.111-5.643-5.4-7.376-9.549z"></path>
          </svg>
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
        </nav>
        {/* <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Button
          <svg
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            className="w-4 h-4 ml-1"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button> */}
      </div>
    </header>
  );
};
export default Navbar;
