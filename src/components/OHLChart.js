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
  const { description = "Pair", data, onChange } = LineChartProps;
  // const priceConstructor = `${description} Price`;
  const isUsd = description.includes("USD");
  let [, yMax] = d3.extent(data, (d) => parseFloat(d.High));
  let [xMin, xMax] = d3.extent(data, (d) => d.date);
  return (
    <ResponsiveContainer minHeight={350} minWidth={250} height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          type="category"
          scale="auto"
          domain={[xMin, xMax]}
        />
        <YAxis
          domain={[0, yMax]}
          // label={{
          //   value: priceConstructor,
          //   angle: -90,
          //   position: "insideBottomLeft",
          // }}
          tickFormatter={(tick) => {
            if (isUsd) {
              // format in dollars with commas, rounded to thousands
              return `$${tick.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}`;
            } else {
              return `${tick}`;
            }
          }}
        />
        <Tooltip
          formatter={(value, name) => {
            // format in dollars with commas, rounded to thousands. limit to only "Low", "High", "Open"
            if (
              isUsd &&
              (name === "Low" || name === "High" || name === "Open")
            ) {
              return `$${value.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}`;
            }
            return value;
          }}
        />
        <Legend />
        <Brush
          dataKey="date"
          height={40}
          stroke="#82ca9d"
          startIndex={data.length > 365 ? data.length - 365 : 0}
        />
        {/* Brush is the bottom bar that allows you to zoom in and out */}
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
          onClick={(e) => {
            onChange(e);
          }}
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
