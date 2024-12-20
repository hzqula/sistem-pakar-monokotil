"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { graphData } from "../data/graf-data";

const VisualisasiGraf: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const { width, height } = dimensions;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 4, -height / 4, width / 2, height / 2]);

    // Buat group terlebih dahulu
    const g = svg.append("g");

    // Sekarang kita bisa menggunakan g dalam zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.2, 2])
      .translateExtent([
        [-width, -height],
        [width, height],
      ])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    const initialTransform = d3.zoomIdentity.scale(0.5);
    svg.call(zoom as any).call(zoom.transform as any, initialTransform);

    const simulation = d3
      .forceSimulation(graphData.nodes as any)
      .force(
        "link",
        d3
          .forceLink(graphData.links)
          .id((d: any) => d.id)
          .distance(100)
          .strength(0.2)
      )
      .force("charge", d3.forceManyBody().strength(-500))
      .force("collide", d3.forceCollide().radius(50).strength(0.2))
      .force("center", d3.forceCenter(0, 0).strength(0.1))
      .alphaDecay(0.02);

    svg
      .append("defs")
      .selectAll("marker")
      .data(["arrow"])
      .join("marker")
      .attr("id", (d) => d)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 25)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#999")
      .attr("d", "M0,-5L10,0L0,5");

    const link = g
      .append("g")
      .selectAll("line")
      .data(graphData.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1)
      .attr("marker-end", "url(#arrow)");

    const node = g
      .append("g")
      .selectAll("g")
      .data(graphData.nodes)
      .join("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended) as any
      );

    node
      .append("circle")
      .attr("r", 8)
      .attr("fill", (d: any) => (d.group === 1 ? "#064359" : "#055A39"))
      .attr("stroke", (d: any) => (d.group === 1 ? "#a0ced9" : "#adf7b6"))
      .attr("stroke-width", 1.5);

    node
      .append("text")
      .attr("dy", 20)
      .attr("text-anchor", "middle")
      .attr("fill", "#000")
      .style("font-size", "10px")
      .text((d: any) => (d.group === 1 ? d.teks : d.id));

    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    return () => {
      simulation.stop();
    };
  }, [dimensions]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default VisualisasiGraf;
