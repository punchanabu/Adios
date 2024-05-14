import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import type { AdiosStat } from "../../@types/member";

interface AdiosChartProps {
  data: AdiosStat[];
}

const AdiosChart: React.FC<AdiosChartProps> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    console.log("AdiosChart useEffect called"); // Debugging log
    console.log("Adios Chart Data:", data); // Debugging log

    if (chartRef.current) {
      const svg = d3.select(chartRef.current)
        .attr('width', 700)
        .attr('height', 500);

      const margin = { top: 40, right: 30, bottom: 60, left: 60 };
      const width = Number(svg.attr('width')) - margin.left - margin.right;
      const height = Number(svg.attr('height')) - margin.top - margin.bottom;
      const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand<string>()
        .domain(data.map(d => d.author))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.count) || 0])
        .nice()
        .range([height, 0]);

      // X-axis
      g.append('g')
        .attr('class', 'x-axis')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end");

      // Y-axis
      g.append('g')
        .attr('class', 'y-axis')
        .call(d3.axisLeft(y));

      // X-axis label
      g.append('text')
        .attr('class', 'axis-label')
        .attr('x', width / 2)
        .attr('y', height + margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .text('ID');

      // Y-axis label
      g.append('text')
        .attr('class', 'axis-label')
        .attr('x', -height / 2)
        .attr('y', -margin.left + 20)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Adios Count');

      // Tooltip
      const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      // Bars
      g.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.author)!)
        .attr('y', d => y(d.count))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.count))
        .attr('fill', '#ff7474')
        .attr('rx', 5) // Rounded corners
        .on("mouseover", function(event, d) {
          tooltip.transition()
            .duration(200)
            .style("opacity", .9);
          tooltip.html(`ID: ${d.author}<br/>Count: ${d.count}`)
            .style("left", (event.pageX + 5) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });
    }
  }, [data]);

  return (
    <>
      <svg ref={chartRef}></svg>
      <style>{`
        .x-axis path,
        .y-axis path,
        .x-axis line,
        .y-axis line {
          stroke: #d9d9d9;
        }

        .x-axis text,
        .y-axis text {
          fill: #4a4a4a;
          font-size: 12px;
        }

        .axis-label {
          font-size: 14px;
          fill: #4a4a4a;
          font-weight: bold;
        }

        .tooltip {
          position: absolute;
          text-align: center;
          width: 80px;
          height: 40px;
          padding: 2px;
          font: 12px sans-serif;
          background: lightsteelblue;
          border: 0px;
          border-radius: 8px;
          pointer-events: none;
        }
      `}</style>
    </>
  );
};

export default AdiosChart;
