import useFetch from "./UseFetch";

const Landing = () => {
  return (
    <section>
      {/* Content Container */}
      <div className="container px-4 py-24 mx-auto">
        {/* Hero Line Container */}
        <p className="sm:text-3xl text-3xl font-medium title-font text-center text-black mb-20">
          Recording the on-chain history of Chainlink oracles
        </p>
        {/* Container for ALL text boxes */}
        <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
          {/* Container for LEFT text box */}
          <div className="p-4 md:w-1/3 flex ">
            {/* Container for icon */}
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-emerald-600 mb-4 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            {/* Container for info breakout */}
            <div className="flex-grow pl-6">
              <p className="text-black text-lg title-font font-medium mb-2">
                All the data, please
              </p>
              <p className="leading-relaxed text-base">
                Providing datasets of historical price information. This is the
                real, unadulterated information recorded to the blockchain.
              </p>
            </div>
          </div>
          {/* Container for CENTER text box */}
          <div className="p-4 md:w-1/3 flex">
            {/* Container for icon */}
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-emerald-600 mb-4 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            {/* Container for info breakout */}

            <div className="flex-grow pl-6">
              <p className="text-black text-lg title-font font-medium mb-2">
                Apples to Apples
              </p>
              <p className="leading-relaxed text-base">
                Chainlink oracles power defi. Using on-chain information enables
                better decisions for protocols that require historical price
                information
              </p>
            </div>
          </div>
          {/* Container for RIGHT text box */}
          <div className="p-4 md:w-1/3 flex">
            {/* Container for icon */}
            <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-emerald-600 mb-4 flex-shrink-0">
              <svg
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                class="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l9 4.9V17L12 22l-9-4.9V7z"></path>
              </svg>
            </div>
            {/* Container for info breakout */}

            <div className="flex-grow pl-6">
              <p className="text-black text-lg title-font font-medium mb-2">
                All the data, please
              </p>
              <p className="leading-relaxed text-base">
                Providing datasets of historical price information. This is the
                real, unadulterated information recorded to the blockchain.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
