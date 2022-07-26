import * as d3 from "d3";
import { useRef, useEffect } from "react";

const BuildBarChart = ({ data = [], dimensions = {} }) => {
  const svgRef = useRef(null);
  const { width, height, margin = {} } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  const formatTime = (utcDate) => {
    return d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(utcDate.updatedAtUTC);
  }; //2020-08-07T14:17:10.000Z || 2022-07-20T23:43:07.000Z

  //   console.log("log price: ", data[0].price);
  //   console.log(
  //     "Log range of prices: ",
  //     d3.extent(data, (d) => parseFloat(d["price"]))
  //   );
  //   console.log(
  //     "Log range of Times: ",
  //     d3.extent(data, (d) => formatTime(d))
  //   );
  //   console.log("Example Time: ", formatTime(data[0]));

  useEffect(() => {
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => formatTime(d)))
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => parseFloat(d["price"]))])
      .range([height, 0]);

    const svgEl = d3.select(svgRef.current); // Create root container where we will append all other chart elements
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements

    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X grid lines with labels
    const xAxis = xScale; // d3.axisBottom(xScale).ticks(5).tickSize(-height + margin.bottom)
    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(xAxis));
    xAxisGroup.select(".domain").remove();

    xAxisGroup.selectAll("line").attr("stroke", "rgba(5, 55, 55, 0.2)");
    xAxisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "black")
      .attr("font-size", "0.75rem");

    // Add Y grid lines with labels
    // const yAxis = d3
    //   .axisLeft(yScale)
    //   .ticks(5)
    //   .tickSize(-width)
    //   .tickFormat((val) => `$${val}`);
    // const yAxisGroup = svg.append("g").call(yAxis);
    // yAxisGroup.select(".domain").remove();
    const yAxisGroup = svg.append("g").call(d3.axisLeft(yScale));

    // yAxisGroup.select(".domain").remove();

    yAxisGroup.selectAll("line").attr("stroke", "rgba(5, 55, 25, 0.2)");
    yAxisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "black")
      .attr("font-size", "0.75rem");

    svg
      .selectAll(".line")
      .datum(data)
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 3)
      .attr(
        "d",
        d3
          .line()
          .x(data, (d) => formatTime(d))
          .y(data, (d) => parseFloat(d["price"]))
      );
  }, [data]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default BuildBarChart;
