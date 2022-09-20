import { FolderPlus, SkipBack, TrendingUp } from "../Icons";

const Landing = () => {
  return (
    <div className="relative">
      {/* Pane Container */}
      <div className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-200 ...">
        {/* Content Container */}
        <div className="container px-4 py-24 mx-auto">
          {/* Hero Line Container */}
          <p className="sm:text-3xl text-3xl font-medium title-font text-center text-black mb-20">
            Historical data sets referenced directly from Chainlink price
            oracles
          </p>
          {/* Container for ALL text boxes */}
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            {/* Container for LEFT text box */}
            <div className="p-4 md:w-1/3 flex ">
              {/* Container for icon */}
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-emerald-600 mb-4 flex-shrink-0">
                <FolderPlus />
              </div>
              {/* Container for info breakout */}
              <div className="flex-grow pl-6">
                <p className="text-black text-lg title-font font-medium mb-2">
                  All the data, please
                </p>
                <p className="leading-relaxed text-base">
                  Providing datasets of historical price information. This is
                  the real, unadulterated information recorded to the
                  blockchain.
                </p>
              </div>
            </div>
            {/* Container for CENTER text box */}
            <div className="p-4 md:w-1/3 flex">
              {/* Container for icon */}
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-emerald-600 mb-4 flex-shrink-0">
                <SkipBack />
              </div>
              {/* Container for info breakout */}

              <div className="flex-grow pl-6">
                <p className="text-black text-lg title-font font-medium mb-2">
                  Apples to Apples
                </p>
                <p className="leading-relaxed text-base">
                  Chainlink oracles power all things decentralized finance
                  (defi). Using on-chain information enables better decisions
                  for protocols that require historical price information
                </p>
              </div>
            </div>
            {/* Container for RIGHT text box */}
            <div className="p-4 md:w-1/3 flex">
              {/* Container for icon */}
              <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-gray-800 text-emerald-600 mb-4 flex-shrink-0">
                <TrendingUp />
              </div>
              {/* Container for info breakout */}

              <div className="flex-grow pl-6">
                <p className="text-black text-lg title-font font-medium mb-2">
                  A growing data ecosystem
                </p>
                <p className="leading-relaxed text-base">
                  This project aims to expand to the Layer 1 and Layer 2 chains
                  serviced by Chainlink
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
