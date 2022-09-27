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

const UpdateHistoryChart = (LineChartProps = {}) => {
  const { description = "Pair", data, margin, selectedTime } = LineChartProps; // const { description = "Pair", data, onChange } = LineChartProps;
  const isUsd = description.includes("USD");
  let [xMin, xMax] = d3.extent(data, (d) => d.date);

  let startIndex = data.length - 1 - selectedTime;
  if (startIndex === isNaN) startIndex = 0;

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
          // domain={[0, yMax]}
          // label={{
          //   value: priceConstructor,
          //   angle: -90,
          //   position: "insideBottomLeft",
          // }}
          // tickFormatter={(tick) => {
          //   if (isUsd) {
          //     // format in dollars with commas, rounded to thousands
          //     return `$${tick.toLocaleString("en-US", {
          //       maximumFractionDigits: 0,
          //     })}`;
          //   } else {
          //     return `${tick}`;
          //   }
          // }}
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
            startIndex={startIndex}
            // onChange={(e) => {
            //   console.log(e);
            //   // onChange(e);
            // }}
          />
          {/* Brush is the bottom bar that allows you to zoom in and out */}

          <Line
            connectNulls
            type="monotone"
            dataKey="updateCount"
            name="Daily Updates"
            activeDot={false}
            strokeWidth={2}
            stroke="#3d2cbf"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export { UpdateHistoryChart };
