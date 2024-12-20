"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { graphData } from "../data/graf-data";

const D3ForceGraph: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref untuk container
  const [dimensions, setDimensions] = useState({ width: 1200, height: 800 });

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    // Set initial dimensions
    handleResize();

    // Add resize listener
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    // Hapus svg sebelumnya jika ada
    d3.select(svgRef.current).selectAll("*").remove();

    const { width, height } = dimensions;

    // Buat SVG container dengan dimensi baru
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    // Buat zoom behavior
    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom as any);

    // Container untuk graf
    const g = svg.append("g");

    // Buat simulasi force
    const simulation = d3
      .forceSimulation(graphData.nodes as any)
      .force(
        "link",
        d3
          .forceLink(graphData.links)
          .id((d: any) => d.id)
          .distance(200)
          .strength(0.1)
      )
      .force("charge", d3.forceManyBody().strength(-2000).distanceMax(1000))
      .force(
        "collide",
        d3.forceCollide().radius(100).strength(0.5).iterations(3)
      )
      .force("center", d3.forceCenter(0, 0).strength(0.05))
      .alphaDecay(0.01);

    // Buat marker untuk arrow
    svg
      .append("defs")
      .selectAll("marker")
      .data(["arrow"])
      .join("marker")
      .attr("id", (d) => d)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 30)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#999")
      .attr("d", "M0,-5L10,0L0,5");

    // Buat links
    const link = g
      .append("g")
      .selectAll("line")
      .data(graphData.links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5)
      .attr("marker-end", "url(#arrow)");

    // Buat nodes container
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

    // Tambah circles ke nodes
    node
      .append("circle")
      .attr("r", 12)
      .attr("fill", (d: any) => (d.group === 1 ? "#064359" : "#C50043"))
      .attr("stroke", (d: any) => (d.group === 1 ? "#a0ced9" : "#ffc09f"))
      .attr("stroke-width", 2);

    // Tambah labels
    node
      .append("text")
      .attr("dy", 25)
      .attr("text-anchor", "middle")
      .attr("fill", "#000")
      .text((d: any) => (d.group === 1 ? d.teks : d.id));

    // Fungsi untuk drag behavior
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

    // Update posisi pada setiap tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Cleanup
    return () => {
      simulation.stop();
    };
  }, [dimensions]); // Update ulang ketika dimensi berubah

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default D3ForceGraph;
