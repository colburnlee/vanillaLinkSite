import useFetch from "../UseFetch";
import ManualLineChart from "../SimpleLineChart";
import RechartLinechart from "../RechartLinechart";

const ETHUSD = () => {
  const ETH_USD_URL =
    "https://gist.githubusercontent.com/colburnlee/86882f86b4706370ad574ff15b292783/raw/a2f0b7e731659ca25668091ef805ad053522d071/ETH_USD.json";
  const { error, isPending, data: pairs } = useFetch(ETH_USD_URL);

  return (
    // Design Block
    <section className="mb-32 text-gray-800">
      <p className="text-5xl font-bold mb-12 mt-4 text-center">ETH-USD</p>
      <div className="flex flex-wrap mb-12">
        <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pl-6">
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pl-6">
            {error && <p className="text-5xl">{error}</p>}
            {isPending && <p className="text-5xl">Loading...</p>}
          </div>
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pl-6">
            <div>
              <div className="border-dotted border-2 p-8 border-emerald-600 hover:border-emerald-900 m-4 mb-10">
                {pairs ? (
                  <>
                    <ul className="text-2xl text-center list-disc mb-2">
                      Pair Information
                      <li className="mt-2 text-start">
                        {pairs.length} updates to blockchain
                      </li>
                      <li>Start {pairs[0]["updatedAtUTC"]}</li>
                    </ul>
                    <ul className="text-2xl text-center list-disc">
                      Trigger Criteria:
                      <li>Price Deviation Threshold: .5%</li>
                      <li>3600 seconds (1 hour) since last update</li>
                    </ul>
                  </>
                ) : (
                  <p className="text-2xl">"Pair information Loading"</p>
                )}
              </div>
            </div>
          </div>
          <div className="grow-0 shrink-0 basis-auto w-full lg:w-6/12 lg:pl-6">
            <div className="relative bg-no-repeat bg-cover  rounded-lg">
              {pairs ? (
                // <ManualLineChart data={pairs} width={900} height={600} />
                <RechartLinechart data={pairs} width={900} height={600} />
              ) : (
                <p className="text-2xl">"Pair information Loading"</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ETHUSD;

// "description":"ETH / USD","decimals":8,"roundId":"55340232221128654863","answer":"39178992539","price":"391.79","startedAtUnix":"1596808126","startedAtUTC":"2020-08-07T13:48:46.000Z","updatedAtUnix":"1596809830","updatedAtUTC":"2020-08-07T14:17:10.000Z","answeredInRound":"55340232221128654849"
