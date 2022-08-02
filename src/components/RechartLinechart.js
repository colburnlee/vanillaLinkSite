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

const RechartLinechart = (LineChartProps = {}) => {
  const formatTime = (utcDate) => {
    return d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(utcDate.updatedAtUTC);
  };

  const dateOptions = {
    // weekday: "short",
    year: "2-digit",
    month: "short",
    // day: "2-digit",
  };

  const { width, height, data, comparisonData = {} } = LineChartProps;

  const priceConstructor = `${data[0].description} Price`;

  const lineChartData = data.reduce((accumulator, currentValue) => {
    accumulator.push({
      date: d3
        .utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(currentValue.updatedAtUTC)
        .toLocaleDateString("en-US", dateOptions),
      Oracle_Price: parseFloat(currentValue.price),
    });
    return accumulator;
  }, []);

  let [yMin, yMax] = d3.extent(lineChartData, (d) => d.Oracle_Price);
  let [xMin, xMax] = d3.extent(data, (d) => formatTime(d));
  xMin = xMin.toLocaleDateString("en-US");
  xMax = xMax.toLocaleDateString("en-US");

  //   console.log(`Min: ${xMin}  Max${xMax}`);

  return (
    <LineChart
      width={width}
      height={height}
      data={lineChartData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="4 1 2" />
      <XAxis
        // scale="time"
        // type="number"
        domain={[xMin, xMax]}
        dataKey="date"
        label={{ value: "Date", position: "insideBottomRight", offset: -10 }}
        // tickCount={10}
      />
      <YAxis
        label={{
          value: priceConstructor,
          angle: -90,
          position: "insideLeft",
        }}
        // domain={[0, yMax]}
        // tickCount={15}
      />
      <Tooltip />
      <Legend />
      <Line dataKey="Oracle_Price" stroke="#8884d8" dot={false} />
    </LineChart>
  );
};

export default RechartLinechart;
