import { Sliders, Heart } from "../Icons";

const Introduction = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-gray-200 to bg-emerald-50">
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
            <h2 className="font-medium title-font text-xl text-black mb-1 tracking-wider">
              <p>Why oracles update:</p>
            </h2>
            <br></br>
            <div className="flex relative pb-12">
              <div className="h-full w-10 absolute inset-0 flex items-center justify-center"></div>
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-black relative z-10">
                <Sliders />
              </div>
              <div className="flex-grow pl-4">
                <ul className="leading-relaxed">
                  <li>
                    <b>Deviation Threshold</b>: Chainlink nodes are constantly
                    monitoring prices of assets off-chain. The deviation of the
                    real-world price of an asset beyond a certain interval
                    triggers all the nodes to update.
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex relative pb-12">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-black relative z-10">
                <Heart />
              </div>
              <div className="flex-grow pl-4">
                <ul className="leading-relaxed">
                  <li>
                    <b>Heartbeat</b>: If the price stays within the deviation
                    parameters, it will only trigger an update every X minutes /
                    hours.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              So, what's an oracle?
            </h1>
            <p className="mb-8 leading-relaxed">
              Chainlink's oracles provide trusted price feeds to L1 and L2
              blockchains. Each feed has certain standard information (usually
              relating to an asset's price) that is regularly updated according
              to its deviation from the previous price on chain and its
              'heartbeat' i.e. the cadence of regular updates onto the
              blockhain. Oracle 'heartbeats' are recorded to the blockchain
              regularly... from once daily, to every 60 mins
            </p>
            <p>
              Once the oracle is updated, the new price is recorded to the
              blockchain. This is the price that is used by smart contracts to
              make decisions, and billions of dollars of value are locked up in
              smart contracts that rely on these prices.
            </p>
            <br></br>
            <div className="flex justify-center">
              <a
                href="https://docs.chain.link/docs/price-feeds-api-reference/#functions-in-aggregatorv3interface"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="inline-flex text-black bg-emerald-600 border-0 py-2 px-6 focus:outline-none hover:bg-emerald-800 rounded text-lg">
                  Chainlink Docs
                </button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Introduction;
