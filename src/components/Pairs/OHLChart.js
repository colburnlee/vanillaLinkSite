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
  const {
    description = "Pair",
    data,
    margin,
    selectedTime,
    // rangeChange,
  } = LineChartProps; // const { description = "Pair", data, onChange } = LineChartProps;
  const isUsd = description.includes("USD");
  let [xMin, xMax] = d3.extent(data, (d) => d.date);
  let [, yMax] = d3.extent(data, (d) => d.high);

  let startIndex = data.length - 1 - selectedTime;
  if (startIndex === isNaN) startIndex = xMin;

  return (
    <>
      <ResponsiveContainer
        minHeight={500}
        minWidth={350}
        // maxWidth={1000}
        // maxHeight={100}
        height="100%"
        width="99%"
        margin={margin}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            type="category"
            scale="auto"
            domain={[xMin, xMax]}
          />
          <YAxis
            type="number"
            tickFormatter={(tick) => {
              if (isUsd) {
                // format in dollars with commas, rounded to thousands
                return `$${tick.toLocaleString("en-US", {
                  maximumFractionDigits: yMax < 100 ? 2 : 0,
                })}`;
              } else {
                return `${tick}`;
              }
            }}
          />
          <Tooltip
            formatter={(value, name) => {
              // format in dollars with commas, rounded to thousands if applicable. limit to only "Low", "High", "Open"
              if (
                isUsd &&
                (name === "Low" || name === "High" || name === "Open")
              ) {
                return `$${value.toLocaleString("en-US", {
                  maximumFractionDigits: yMax < 100 ? 2 : 0,
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
            startIndex={startIndex}
            // onChange={(e) => {
            //   rangeChange(e);
            // }}
          />
          {/* Brush is the bottom bar that allows you to zoom in and out */}
          <Line
            connectNulls
            type="monotone"
            dataKey="low"
            name="Low"
            stroke="#8884d8"
            dot={false}
            strokeWidth={2}
          />
          <Line
            connectNulls
            type="monotone"
            dataKey="high"
            name="High"
            stroke="#82ca9d"
            dot={false}
            strokeWidth={2}
          />
          <Line
            connectNulls
            type="monotone"
            dataKey="open"
            name="Open"
            stroke="#3d2cbf"
            strokeWidth={2}
            dot={false}
          />
          {/* <Line
            connectNulls
            type="monotone"
            dataKey="updateCount"
            name="Daily Updates"
            activeDot={false}
            strokeWidth={0}
            stroke="#000000"
            dot={false}
            legendType="none"
          /> */}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default OHLChart;
