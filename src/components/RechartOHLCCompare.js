import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import * as d3 from "d3";

const RechartOHLCCompare = (LineChartProps = {}) => {
  const { width, height, data, comparisonData } = LineChartProps;
  const dateOptions = {
    // weekday: "short",
    year: "2-digit",
    month: "short",
    // day: "2-digit",
  };
  //   const formatTime = (date) => {
  //     return d3.timeFormat("%B %d, %Y")(date.period);
  //   };

  const dateFormat = d3.timeFormat("%-H:%M %b %d, %y");
  console.log("Time formatting test: ", dateFormat(new Date(1596931200000)));

  const lineChartData = comparisonData.data.reduce(
    (accumulator, currentValue) => {
      accumulator.push({
        date: dateFormat(new Date(currentValue.period)),
        low: parseFloat(currentValue.low.toFixed(2)),
        high: parseFloat(currentValue.high.toFixed(2)),
      });
      return accumulator;
    },
    []
  );

  const oracle_data = data.reduce((accumulator, currentValue) => {
    accumulator.push({
      date: dateFormat(new Date(currentValue.updatedAtUnix * 1000)),
      oracle_price: parseFloat(currentValue.price),
    });
    return accumulator;
  }, []);
  //   console.log(oracle_data[0]);

  //   console.log(lineChartData);
  let [xMin, xMax] = d3.extent(comparisonData.data, (d) => d.period);
  xMin = dateFormat(new Date(xMin));
  xMax = dateFormat(new Date(xMax));
  //   xMin = xMin.toLocaleDateString("en-US", dateOptions);
  //   xMax = xMax.toLocaleDateString("en-US", dateOptions);

  let [yMin, yMax] = d3.extent(lineChartData, (d) => parseFloat(d.high));

  //   console.log(`X Axis Min: ${xMin}  Max: ${xMax}`);
  //   console.log(`Y Axis Min: ${yMin}  Max: ${yMax}`);

  console.log("OHLC Array Sample: ", lineChartData[0]);
  console.log("Oracle Array Sample: ", oracle_data[0]);
  //   const combinedData = lineChartData.concat(oracle_data);

  return (
    <LineChart
      width={width}
      height={height}
      data={oracle_data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" domain={[xMin, xMax]} />
      <YAxis domain={[0, yMax]} />
      <Tooltip />
      <Legend />
      {/* <Line type="monotone" dataKey="low" stroke="#8884d8" dot={false} />
      <Line type="monotone" dataKey="high" stroke="#82ca9d" dot={false} /> */}
      <Line type="monotone" dataKey="oracle_price" stroke="#3d2cbf" />
    </LineChart>
  );
};

export default RechartOHLCCompare;
