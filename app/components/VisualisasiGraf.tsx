"use client";

import React, { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { graphData } from "../data/graf-data";
import * as d3 from "d3";

const ForceGraph2D = dynamic(
  () => import("react-force-graph").then((mod) => mod.ForceGraph2D),
  { ssr: false }
);

const VisualisasiGraf: React.FC = () => {
  const fgRef = useRef<any>(null);

  useEffect(() => {
    if (fgRef.current) {
      const fg = fgRef.current;

      fg.d3Force("charge").strength(-200);
      fg.d3Force("collide", d3.forceCollide().radius(40));
    }
  }, []);

  return (
    <div className="w-full h-screen">
      <ForceGraph2D
        ref={fgRef}
        graphData={graphData}
        nodeLabel={(node) => (node.group === 1 ? node.teks : node.id)}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.group === 1 ? node.teks : node.id;
          const fontSize = 12 / globalScale;

          // Border
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, 6, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.group === 1 ? "#3182CE" : "#48BB78";
          ctx.fill();

          // Isi node
          ctx.beginPath();
          ctx.arc(node.x!, node.y!, 4, 0, 2 * Math.PI, false);
          ctx.fillStyle = node.group === 1 ? "#A0C4FF" : "#90EE90";
          ctx.fill();

          // Label node
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = "#000";
          ctx.fillText(label, node.x!, node.y! + 12);
        }}
        linkDirectionalArrowLength={6}
        linkDirectionalParticles={1}
        linkLabel={(link) =>
          `Pertanyaan: ${link.source}, memiliki hubungan dengan tanaman: ${link.target}`
        }
        enableZoomInteraction={true}
      />
    </div>
  );
};

export default VisualisasiGraf;
