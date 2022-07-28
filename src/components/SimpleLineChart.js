import { useLayoutEffect, useMemo, useRef } from "react";
import * as d3 from "d3";

const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

export const LineChart = (LineChartProps = {}) => {
  const formatTime = (utcDate) => {
    return d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(utcDate.updatedAtUTC);
  }; //2020-08-07T14:17:10.000Z || 2022-07-20T23:43:07.000Z

  // bounds = area inside the graph axis = calculated by substracting the margins
  const { width, height, data = {} } = LineChartProps;
  const axesRef = useRef(null);
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  // Y axis
  const [min, max] = d3.extent(data, (d) => parseFloat(d["price"]));
  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, max || 0])
      .range([boundsHeight, 0]);
  }, [data, height]);

  // X axis
  const [xMin, xMax] = d3.extent(data, (d) => formatTime(d));
  const xScale = useMemo(() => {
    return d3
      .scaleTime()
      .domain([xMin, xMax || 0])
      .range([0, boundsWidth]);
  }, [data, width]);

  // Render the X and Y axis using d3.js, not react
  useLayoutEffect(() => {
    const svgElement = d3.select(axesRef.current);
    svgElement.selectAll("*").remove();
    const xAxisGenerator = d3.axisBottom(xScale);
    svgElement
      .append("g")
      .attr("transform", "translate(0," + boundsHeight + ")")
      .call(xAxisGenerator);

    const yAxisGenerator = d3.axisLeft(yScale);
    svgElement.append("g").call(yAxisGenerator);
  }, [xScale, yScale, boundsHeight]);

  // Build the line
  const lineBuilder = d3
    .line()
    .x((d) => xScale(formatTime(d)))
    .y((d) => yScale(d["price"]));
  const linePath = lineBuilder(data);

  if (!linePath) {
    console.log("No Line Generated");
    return null;
  }

  return (
    <div>
      <svg width={width} height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        >
          <path
            d={linePath}
            opacity={1}
            stroke="#0a0a0a"
            fill="none"
            strokeWidth={1}
          />
        </g>
        <g
          width={boundsWidth}
          height={boundsHeight}
          ref={axesRef}
          transform={`translate(${[MARGIN.left, MARGIN.top].join(",")})`}
        />
      </svg>
    </div>
  );
};
export default LineChart;
