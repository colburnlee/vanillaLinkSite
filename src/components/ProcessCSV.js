import * as d3 from "d3";
import { scaleBand, scaleLinear } from "d3";

const ProcessJson = async () => {
  const data = await d3.json(
    "https://gist.githubusercontent.com/colburnlee/86882f86b4706370ad574ff15b292783/raw/ETH_USD.json"
  );

  const dataSlice = data.slice(0, 10);

  //   return dataSlice.map((d) => (
  //     <div>
  //       Date: {d.updatedAtUTC} Price: ${d.price}{" "}
  //     </div>
  //   ));

  const height = 500;
  const width = 960;

  const yScale = scaleBand()
    .domain(dataSlice.map((d) => d.price))
    .range([0, height]);

  const xScale = scaleLinear().domain([0, 10]).range([0, width]);

  return (
    <d3.svg width={width} height={height}>
      {dataSlice.map((d) => (
        <rect
          key={d.answeredInRound}
          y={yScale(400)}
          width={xScale(d.price)}
          height={yScale.bandwidth()}
        />
      ))}
    </d3.svg>
  );
};

export default ProcessJson;

// answer: "39178992539"
// answeredInRound: "55340232221128654849"
// decimals: 8
// description: "ETH / USD"
// price: "391.79"
// roundId: "55340232221128654863"
// startedAtUTC: "2020-08-07T13:48:46.000Z"
// startedAtUnix: "1596808126"
// updatedAtUTC: "2020-08-07T14:17:10.000Z"
// updatedAtUnix: "1596809830"
