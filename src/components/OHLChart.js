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

const OHLChart = (LineChartProps = {}) => {
  const { width, height, description = "Pair", data } = LineChartProps;
  const priceConstructor = `${description} Price`;
  let [, yMax] = d3.extent(data, (d) => parseFloat(d.High));
  let [xMin, xMax] = d3.extent(data, (d) => d.date);
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={width}
        height={height}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          type="category"
          scale="auto"
          domain={[xMin, xMax]}
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
          dataKey="Low"
          stroke="#8884d8"
          dot={false}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="High"
          stroke="#82ca9d"
          dot={false}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="Open"
          stroke="#3d2cbf"
          dot={false}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="Updates"
          strokeWidth={1}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OHLChart;
