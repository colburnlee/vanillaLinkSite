import { Link } from "react-router-dom";
import { VerticalHexigon, Twitter } from "./Icons";

const Footer = () => {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col ">
        <Link
          to="/"
          className="flex title-font font-medium items-center md:justify-start justify-center text-white"
        >
          <VerticalHexigon />
        </Link>
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          © 2022 Link to the Past
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a
            href="https://twitter.com/bbno_eth"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-gray-400"
          >
            <Twitter />
          </a>

          <a
            href="https://www.linkedin.com/in/leecolburn/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-3 text-gray-400"
          >
            <svg
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="0"
              class="w-5 h-5"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
