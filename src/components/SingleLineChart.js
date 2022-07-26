import React from "react";
import * as d3 from "d3";

const SingleLineChart = ({ data = [], dimensions = {} }) => {
  const svgRef = React.useRef(null);
  const { width, height, margin = {} } = dimensions;
  const svgWidth = width + margin.left + margin.right;
  const svgHeight = height + margin.top + margin.bottom;
  console.log(data);
  //   console.log(
  //     "Max Price Found: $",
  //     d3.max(data.items, (d) => d.price)
  //   );
  //   console.log("Test date", data.items[0]["updatedAtUTC"]);

  //   console.log(
  //     "Price Range: ",
  //     d3.extent(data.items, (d) => parseInt(d["price"]))
  //   );

  //   console.log(data.items[0]["startedAtUTC"]);
  //   console.log(width); // 600

  const formatTime = (utcDate) => {
    return {
      date: d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(utcDate.updatedAtUTC),
    }; //2020-08-07T14:17:10.000Z || 2022-07-20T23:43:07.000Z
  };
  console.log("Testing Parse Date: ", formatTime(data.items[30000]));
  //   console.log(
  //     "Date Range: ",
  //     d3.extent(data.items, (d) => formatTime(d))
  //   );

  console.log(
    "min",
    d3.min(data.items, (d) => formatTime(d))
  );
  //   console.log(
  //     "max",
  //     d3.max(data.items, (d) => formatTime(d))
  //   );

  React.useEffect(() => {
    const xScale = d3
      .scaleTime()
      //   .domain(d3.extent(data.items, (d) => formatTime(d)))
      .domain([
        d3.min(data, (d) => formatTime(d).date),
        formatTime(data.items[30000]),
      ])
      .range([0, width]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data.items, (d) => parseInt(d["price"])))
      .range([height, 0]);

    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements
    const svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Add X grid lines with labels
    const xAxis = d3
      .axisBottom(xScale)
      .ticks(5)
      .tickSize(-height + margin.bottom);
    const xAxisGroup = svg
      .append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(xAxis);
    xAxisGroup.select(".domain").remove();
    xAxisGroup.selectAll("line").attr("stroke", "rgba(25, 25, 55, 0.2)");
    xAxisGroup
      .selectAll("text")
      .attr("opacity", 0.5)
      .attr("color", "black")
      .attr("font-size", "0.75rem");

    // Add Y grid lines with labels
    const yAxis = d3
      .axisLeft(yScale)
      .ticks(5)
      .tickSize(-width)
      .tickFormat((val) => `${val}`);
    const yAxisGroup = svg.append("g").call(yAxis);
    yAxisGroup.select(".domain").remove();
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
          .x((d) => formatTime(d.items))
          .y((d) => parseFloat(d.items.price))
      );
  }, [data]);

  return <svg ref={svgRef} width={svgWidth} height={svgHeight} />;
};

export default SingleLineChart;
