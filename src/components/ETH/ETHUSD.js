import useFetch from "../UseFetch";
import LineChart from "../SimpleLineChart";

const ETHUSD = () => {
  const ETH_USD_URL =
    "https://gist.githubusercontent.com/colburnlee/86882f86b4706370ad574ff15b292783/raw/a2f0b7e731659ca25668091ef805ad053522d071/ETH_USD.json";
  const { error, isPending, data: pairs } = useFetch(ETH_USD_URL);

  return (
    <>
      <div className="flex justify-center flex-shrink">
        {error && <p className="text-5xl">{error}</p>}
        {isPending && <p className="text-5xl">Loading...</p>}
      </div>
      <div className="grid grid-cols-2 gap-4 m-8">
        <div className="flex justify-center flex-shrink">
          <div>
            <p className="text-5xl mb-8">ETH-USD</p>
            <div className="border-dotted border-2 p-8 border-emerald-600 hover:border-emerald-900">
              {pairs ? (
                <ul className="text-2xl text-center list-disc">
                  Pair Information
                  <li className="mt-2 text-start">
                    {pairs.length} updates to blockchain
                  </li>
                  <li> Start {pairs[0]["updatedAtUTC"]}</li>
                </ul>
              ) : (
                <p className="text-2xl">"Pair information Loading"</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-12">
          {pairs ? (
            <LineChart data={pairs} width={900} height={600} />
          ) : (
            <p className="text-2xl">"Pair information Loading"</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ETHUSD;

// "description":"ETH / USD","decimals":8,"roundId":"55340232221128654863","answer":"39178992539","price":"391.79","startedAtUnix":"1596808126","startedAtUTC":"2020-08-07T13:48:46.000Z","updatedAtUnix":"1596809830","updatedAtUTC":"2020-08-07T14:17:10.000Z","answeredInRound":"55340232221128654849"
