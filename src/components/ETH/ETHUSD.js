import useFetch from "../UseFetch";
import BuildBarChart from "../BuildBarChart";

const ETHUSD = () => {
  const ETH_USD_URL =
    "https://gist.githubusercontent.com/colburnlee/86882f86b4706370ad574ff15b292783/raw/a2f0b7e731659ca25668091ef805ad053522d071/ETH_USD.json";
  const { error, isPending, data: pairs } = useFetch(ETH_USD_URL);
  const dimensions = {
    width: 600,
    height: 300,
    margin: {
      top: 30,
      right: 30,
      bottom: 30,
      left: 60,
    },
  };
  return (
    <>
      <h1>This is the landing for the ETH-USD Pair</h1>
      <div className="home">
        {error && <div>{error}</div>}
        {isPending && <div>Loading...</div>}
        {pairs ? (
          <div id="my_dataviz">
            `${JSON.stringify(pairs[0].description)} loading complete - Total
            Length ${pairs.length}. Start ${pairs[0]["updatedAtUTC"]}`
            <BuildBarChart data={pairs} dimensions={dimensions} />
          </div>
        ) : (
          "Pair information Loading"
        )}
      </div>
    </>
  );
};

export default ETHUSD;

// "description":"ETH / USD","decimals":8,"roundId":"55340232221128654863","answer":"39178992539","price":"391.79","startedAtUnix":"1596808126","startedAtUTC":"2020-08-07T13:48:46.000Z","updatedAtUnix":"1596809830","updatedAtUTC":"2020-08-07T14:17:10.000Z","answeredInRound":"55340232221128654849"
