import { Sliders, Heart } from "../Icons";
import { useEffect, useState } from "react";
import { LoadingWheel } from "../Icons";
import { connectProviderContract } from "../ethers/connectProviderContract";

const Introduction = () => {
  const [answer, setAnswer] = useState(null);
  const [answeredInRound, setAnsweredInRound] = useState(null);
  const [roundId, setRoundId] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [updatedAt, setUpdatedAt] = useState(null);

  useEffect(() => {
    (async () => {
      const EthUsdcontract = "0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419";
      const network = "homestead";
      const contract = await connectProviderContract(EthUsdcontract, network);
      const latestRoundResult = await contract.latestRoundData();
      setAnswer(+latestRoundResult.answer);
      setAnsweredInRound(latestRoundResult.answeredInRound.toString());
      setRoundId(latestRoundResult.roundId.toString());
      setStartedAt(latestRoundResult.startedAt.toString());
      setUpdatedAt(latestRoundResult.updatedAt.toString());
    })();
  });
  return (
    <div className="flex flex-col items-center justify-center ">
      <div className="relative">
        <section className="text-gray-600 body-font sticky flex flex-col items-center justify-center min-h-screen">
          <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
            <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 flex-col">
              <h2 className="font-medium title-font text-xl text-black mb-1 tracking-wider">
                <p>Why oracles update:</p>
              </h2>
              <br></br>
              <div className="flex relative pb-12">
                <div className="h-full w-10 absolute inset-0 flex items-center justify-center"></div>
                <div className="flex-shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center hover:bg-emerald-800 bg-emerald-600 text-gray-800 relative z-10">
                  <Sliders />
                </div>
                <div className="flex-grow pl-4">
                  <ul className="leading-relaxed">
                    <li>
                      <b>Deviation Threshold</b>: Chainlink nodes are constantly
                      monitoring prices of assets off-chain. The deviation of
                      the real-world price of an asset beyond a certain interval
                      triggers all the nodes to update.
                    </li>
                  </ul>
                </div>
              </div>
              <div className="flex relative pb-12">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-gray-800 hover:bg-emerald-800 relative z-10">
                  <Heart />
                </div>
                <div className="flex-grow pl-4">
                  <ul className="leading-relaxed">
                    <li>
                      <b>Heartbeat</b>: If the price stays within the deviation
                      parameters, it will only trigger an update every X minutes
                      / hours.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:flex-grow md:w-1/2  flex flex-col md:items-start md:text-left  mx-2">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
                So, what's an oracle?
              </h1>
              <p className="mb-8 leading-relaxed">
                Chainlink's oracles provide trusted price feeds to L1 and L2
                blockchains. Each feed has certain standard information (usually
                relating to an asset's price) that is regularly updated
                according to its deviation from the previous price on chain and
                its 'heartbeat' i.e. the cadence of regular updates onto the
                blockhain. Oracle 'heartbeats' are recorded to the blockchain
                regularly... from once daily, to every 60 mins
              </p>
              <p>
                Once the oracle is updated, the new price is recorded to the
                blockchain. This is the price that is used by smart contracts to
                make decisions, and billions of dollars of value are locked up
                in smart contracts that rely on these prices.
              </p>
              <br></br>
              <div className="flex justify-center">
                <a
                  href="https://docs.chain.link/docs/price-feeds-api-reference/#functions-in-aggregatorv3interface"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className=" flex mx-auto text-white bg-emerald-600 border-0 py-2 px-8 focus:outline-none hover:bg-emerald-800 rounded text-lg  mt-2 ">
                    Chainlink Docs
                  </button>
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="text-gray-600 body-font  flex flex-col items-center justify-center min-h-screen">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0">
            <h1 className="title-font sm:text-4xl text-3xl pt-10 my-4 font-medium text-gray-900 text-center">
              What can you get from an oracle?
            </h1>
            <h2 className="title-font sm:text-xl text-xl mb-4 font-medium text-gray-800 py-2 text-center">
              Introducing Chainlink's V3 Aggregator
            </h2>
          </div>
          <div className="container mx-auto flex px-5 py-12 md:flex-row flex-col items-center">
            <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
              <div className="flex flex-col text-left lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
                <p>
                  A few tools are needed to request information from the
                  blockchain,but the information returned is robust.
                  <ul className=" md:text-left">
                    <u>
                      <b>roundId</b>
                    </u>
                    : The round ID
                  </ul>
                  <ul>
                    <u>
                      <b>answer</b>
                    </u>
                    : The answer for this round
                  </ul>
                  <ul>
                    <u>
                      <b>startedAt</b>
                    </u>
                    : Timestamp of when the round started
                  </ul>
                  <ul>
                    <u>
                      <b>updatedAt</b>
                    </u>
                    : Timestamp of when the round was updated
                  </ul>
                  <ul>
                    <u>
                      <b>answeredInRound</b>
                    </u>
                    : The round ID in which the answer was computed
                  </ul>
                </p>
                <br></br>
              </div>
            </div>
            <div className="lg:flex-grow md:w-1/2 lg:pl-24  flex flex-col md:items-start md:text-left items-center text-center mx-1">
              {/* <div className="lg:max-w-lg lg:w-full md:w-1/2 w-7/8 mb-10 md:mb-0"> */}
              <h1 className="title-font sm:text-xl text-xl mb-4 font-medium text-gray-900">
                Current ETH-USD Price Feed Response
              </h1>
              {roundId ? (
                <div className="flex flex-grow p-2 text-gray-300 bg-gray-800 rounded-lg mt-6 overflow-auto text-sm max-w-lg md:max-w-full  md:text-base lg:w-full ">
                  <pre className="flex flex-col flex-grow w-full">
                    <code className="flex flex-grow">Round ID: {roundId}</code>
                    <code className="flex flex-grow ">Answer: {answer}</code>
                    <code className="flex flex-grow ">
                      Answered In Round: {answeredInRound}
                    </code>
                    <code className="flex flex-grow ">
                      Started At: {startedAt}
                    </code>
                    <code className="flex flex-grow ">
                      Updated At: {updatedAt}
                    </code>
                  </pre>
                </div>
              ) : (
                <div className="items-center text-center">
                  {" "}
                  <LoadingWheel />{" "}
                </div>
              )}
              <br></br>
              {/* </div> */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Introduction;
