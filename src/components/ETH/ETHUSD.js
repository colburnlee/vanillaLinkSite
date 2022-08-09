import useFetch from "../UseFetch";
import RechartLinechart from "../RechartLinechart";
import RechartOHLCCompare from "../RechartOHLCCompare";

const ETHUSD = () => {
  const ETH_USD_OHLC_URL =
    "https://gist.githubusercontent.com/colburnlee/61896ce060edcb9db7cb110dd44887bd/raw/60078578b362a9883b579845bbd2490dfebbd1ee/ETH_USDT_OHLC.json";
  const ETH_USD_URL =
    "https://gist.githubusercontent.com/colburnlee/86882f86b4706370ad574ff15b292783/raw/a2f0b7e731659ca25668091ef805ad053522d071/ETH_USD.json";
  const {
    error,
    isPending,
    data: pairs,
    comparisonData,
  } = useFetch(ETH_USD_URL, ETH_USD_OHLC_URL);

  return (
    <section className="text-black bg-white body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex flex-wrap w-full">
          {/* Div for Pair Name, Description, and Information */}
          <div className="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
            {/* Pair Name and Loading Status */}
            <div className="flex relative pb-12">
              <div class="h-full w-1 bg-gray-800 pointer-events-none"></div>
              <div className="flex-grow pl-4">
                {error && <p className="text-5xl">{error}</p>}
                {isPending && <p className="text-5xl">Loading...</p>}
                {pairs && (
                  <p className="text-5xl"> {pairs[0]["description"]} </p>
                )}
              </div>
            </div>

            {/* General Pair Info */}
            {pairs ? (
              <>
                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-white relative z-10">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-black mb-1 tracking-wider">
                      <p>Pair Information</p>
                    </h2>
                    <p className="leading-relaxed">
                      <p>Start Date: {pairs[0]["updatedAtUTC"]}</p>
                      <p>Updates to Blockchain: {pairs.length}</p>
                    </p>
                  </div>
                </div>

                <div className="flex relative pb-12">
                  <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-white relative z-10">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="5" r="3"></circle>
                      <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-black mb-1 tracking-wider">
                      STEP 2
                    </h2>
                    <p className="leading-relaxed">
                      Vice migas literally kitsch +1 pok pok. Truffaut hot
                      chicken slow-carb health goth, vape typewriter.
                    </p>
                  </div>
                </div>

                <div className="flex relative">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-600 inline-flex items-center justify-center text-white relative z-10">
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                      <path d="M22 4L12 14.01l-3-3"></path>
                    </svg>
                  </div>
                  <div className="flex-grow pl-4">
                    <h2 className="font-medium title-font text-sm text-black mb-1 tracking-wider">
                      FINISH
                    </h2>
                    <p className="leading-relaxed">
                      Pitchfork ugh tattooed scenester echo park gastropub
                      whatever cold-pressed retro.
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-xl">Pair information Loading</p>
            )}
          </div>
          <div className="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12">
            {pairs && comparisonData ? (
              // <ManualLineChart data={pairs} width={900} height={600} />
              <RechartOHLCCompare
                comparisonData={comparisonData}
                data={pairs}
                width={900}
                height={600}
              />
            ) : (
              <p className="text-2xl">"Pair information Loading"</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ETHUSD;

// "description":"ETH / USD","decimals":8,"roundId":"55340232221128654863","answer":"39178992539","price":"391.79","startedAtUnix":"1596808126","startedAtUTC":"2020-08-07T13:48:46.000Z","updatedAtUnix":"1596809830","updatedAtUTC":"2020-08-07T14:17:10.000Z","answeredInRound":"55340232221128654849"
