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
        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
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
            position: "insideBottomLeft",
          }}
        />
        <Tooltip />
        <Legend />
        <Brush dataKey="date" height={40} stroke="#82ca9d" />
        <Line
          connectNulls
          type="monotone"
          dataKey="low"
          name="Low"
          stroke="#8884d8"
          dot={false}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="high"
          name="High"
          stroke="#82ca9d"
          dot={false}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="open"
          name="Open"
          stroke="#3d2cbf"
          dot={false}
        />
        <Line
          connectNulls
          type="monotone"
          dataKey="updateCount"
          name="Daily Updates"
          activeDot={false}
          strokeWidth={0}
          stroke="#000000"
          dot={false}
          legendType="none"
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default OHLChart;
