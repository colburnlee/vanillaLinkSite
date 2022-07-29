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
  const { width, height, data = {} } = LineChartProps;
  const lineChartData = data.reduce((accumulator, currentValue) => {
    accumulator.push({
      date: d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(currentValue.updatedAtUTC),
      price: currentValue.price,
    });
    return accumulator;
  }, []);
  const testData = lineChartData.slice(0, 100);

  return (
    <LineChart
      width={width}
      height={height}
      data={testData}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="4 1 2" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line
        type="monotone"
        dataKey="price"
        stroke="#8884d8"
        activeDot={{ r: 8 }}
      />
    </LineChart>
  );
};

export default RechartLinechart;
