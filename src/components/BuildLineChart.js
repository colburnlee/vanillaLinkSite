import * as d3 from "d3";
import { useRef, useEffect } from "react";

const BuildLineChart = ({ data = [], dimensions = {} }) => {
  const margin = { top: 10, right: 30, bottom: 30, left: 50 },
    width = 560 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
  let svgRef = useRef(null);

  //   console.log(data);
  // append the svg object to the body of the page
  useEffect(() => {
    // Create root container where we will append all other chart elements
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove(); // Clear svg content before adding new elements

    let svg = svgEl
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", width - margin.left - margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.json(
      "https://gist.githubusercontent.com/colburnlee/86882f86b4706370ad574ff15b292783/raw/a2f0b7e731659ca25668091ef805ad053522d071/ETH_USD.json",
      (d) => {
        //   console.log(d.price);
        return {
          updatedAtUTC: d3.utcParse("%Y-%m-%dT%H:%M:%S.%LZ")(d.updatedAtUTC),
          price: d.price,
        };
      }
    ).then(
      // Now I can use this dataset:

      function (data) {
        // Add X axis --> it is a date format
        console.log(d3.extent(data, (d) => d.updatedAtUTC));

        const x = d3
          .scaleTime()
          .domain(d3.extent(data, (d) => d.updatedAtUTC))
          .range([0, width]);
        svg
          .append("g")
          .attr("transform", `translate(0,${height})`)
          .call(d3.axisBottom(x));

        // Add Y axis
        const y = d3
          .scaleLinear()
          .domain([0, d3.max(data, (d) => +d.price)])
          .range([height, 0]);
        svg.append("g").call(d3.axisLeft(y));

        // Add the area
        svg
          .append("path")
          .datum(data)
          .attr("fill", "#cce5df")
          .attr("stroke", "#69b3a2")
          .attr("stroke-width", 1.5)
          .attr(
            "d",
            d3
              .area()
              .x((d) => x(d.updatedAtUTC))
              .y0(y(0))
              .y1((d) => y(d.price))
          );
        console.log(svg);
      }
    );
  }, [data]);
  return <svg ref={svgRef} width={width} height={height} />;
};

export default BuildLineChart;
