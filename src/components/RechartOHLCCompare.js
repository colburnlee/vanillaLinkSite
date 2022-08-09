import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
} from "recharts";
import * as d3 from "d3";

const RechartOHLCCompare = (LineChartProps = {}) => {
  const { width, height, data, comparisonData } = LineChartProps;
  const priceConstructor = `${data[0].description} Price`;
  // const dateOptions = {
  //   // weekday: "short",
  //   year: "2-digit",
  //   month: "short",
  //   // day: "2-digit",
  // };
  //   const formatTime = (date) => {
  //     return d3.timeFormat("%B %d, %Y")(date.period);
  //   };

  const dateFormat = d3.timeFormat("%-H:%M %b %d, %y");
  // console.log("Time formatting test: ", dateFormat(new Date(1596931200000)));

  const lineChartData = comparisonData.data.reduce(
    (accumulator, currentValue) => {
      accumulator.push({
        date: dateFormat(new Date(currentValue.period)),
        low: parseFloat(currentValue.low),
        high: parseFloat(currentValue.high),
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
  // let [xMin, xMax] = d3.extent(oracle_data, (d) => d.period);
  // xMin = dateFormat(new Date(xMin));
  // xMax = dateFormat(new Date(xMax));
  //   xMin = xMin.toLocaleDateString("en-US", dateOptions);
  //   xMax = xMax.toLocaleDateString("en-US", dateOptions);

  // let [yMin, yMax] = d3.extent(lineChartData, (d) => parseFloat(d.high));

  //   console.log(`X Axis Min: ${xMin}  Max: ${xMax}`);
  //   console.log(`Y Axis Min: ${yMin}  Max: ${yMax}`);

  // console.log("OHLC Array Sample: ", lineChartData[0]);
  // console.log("Oracle Array Sample: ", oracle_data[0]);
  // console.log("OHLC Array Length: ", lineChartData.length);
  // console.log("Oracle Array Length: ", oracle_data.length);

  const combinedData = lineChartData.concat(oracle_data).sort(function (a, b) {
    // TODO - Re-sort array to excise the thousands of ~1min updates during proxy version upgrades
    return new Date(a.date) - new Date(b.date);
  });
  console.log("Combined Array: ", combinedData);

  // FOR TESTING - SLICE VARIABLES
  const combinedDataSlice = combinedData.slice(18000, 19000);
  const lineChartSlice = lineChartData.slice(18000, 19000);
  let [xMin, xMax] = d3.extent(lineChartSlice, (d) => d.period);
  xMin = dateFormat(new Date(xMin));
  xMax = dateFormat(new Date(xMax));
  let [yMin, yMax] = d3.extent(combinedDataSlice, (d) => parseFloat(d.high));
  // END SLICE VARIABLES

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={width}
        height={height}
        data={combinedDataSlice}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          domain={[xMin, xMax]}
          type="category"
          scale={"auto"}
        />
        <YAxis
          domain={[0, yMax]}
          label={{
            value: priceConstructor,
            angle: -90,
            position: "insideLeft",
          }}
        />
        <Tooltip />
        <Legend />
        <Brush dataKey="date" height={40} stroke="#82ca9d" />
        <Line
          connectNulls
          type="monotone"
          dataKey="low"
          stroke="#8884d8"
          dot={false}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="high"
          stroke="#82ca9d"
          dot={false}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="oracle_price"
          stroke="#3d2cbf"
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default RechartOHLCCompare;
