"use client";

import React, { useEffect, useRef, useState } from "react";
import { useExpertSystem } from "@/app/utils/logika-sistem-pakar";
import * as d3 from "d3";
import { graphData } from "@/app/data/graf-data";
import { useRouter } from "next/navigation";

type Node = {
  id: string;
  teks?: string;
  group: number;
};

const ExpertSystemWithGraph = () => {
  const {
    currentQuestion,
    result,
    handleAnswer,
    handleReset,
    possiblePlants,
    filteredGraph,
    questionHistory,
  } = useExpertSystem();

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
      .attr("viewBox", [-width / 2, -height / 2, width, height]);

    const g = svg.append("g");

    const zoom = d3
      .zoom()
      .scaleExtent([0.1, 4])
      .translateExtent([
        [-width * 2, -height * 2],
        [width * 2, height * 2],
      ])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    // Create nodes including all questions and plants
    const allNodes = [...filteredGraph.nodes];
    const questionNodes = [...(questionHistory || [])];
    if (currentQuestion && !questionNodes.includes(currentQuestion)) {
      questionNodes.push(currentQuestion);
    }

    // Add question nodes
    questionNodes.forEach((question) => {
      if (!allNodes.some((node) => node.id === question.id)) {
        allNodes.push({
          id: question.id,
          group: 2,
        });
      }
    });

    // Create links for questions sequence and current question to plants
    const allLinks = [];

    // Add links between sequential questions only
    for (let i = 1; i < questionNodes.length; i++) {
      allLinks.push({
        source: questionNodes[i - 1].id,
        target: questionNodes[i].id,
        type: "question-sequence",
      });
    }

    // Add links only between current question and possible plants
    if (currentQuestion) {
      possiblePlants.forEach((plant) => {
        allLinks.push({
          source: currentQuestion.id,
          target: plant.nama,
          type: "question-plant",
        });
      });
    }

    // Add link to final result if available
    if (result && questionHistory && questionHistory.length > 0) {
      allLinks.push({
        source: questionHistory[questionHistory.length - 1].id,
        target: result.nama,
        type: "final-result",
      });
    }

    // Enhanced simulation with adjusted forces
    const simulation = d3
      .forceSimulation(allNodes as any)
      .force(
        "link",
        d3
          .forceLink(allLinks)
          .id((d: any) => d.id)
          .distance((d: any) => {
            if (d.type === "final-result") return 120;
            return d.type === "question-sequence" ? 100 : 150;
          })
          .strength((d: any) => {
            if (d.type === "final-result") return 0.3;
            return d.type === "question-sequence" ? 0.2 : 0.1;
          })
      )
      .force("charge", d3.forceManyBody().strength(-1000))
      .force("collide", d3.forceCollide().radius(80).strength(0.5))
      .force("center", d3.forceCenter(0, 0).strength(0.1))
      .force("x", d3.forceX().strength(0.1))
      .force("y", d3.forceY().strength(0.1));

    // Arrow markers
    svg
      .append("defs")
      .selectAll("marker")
      .data(["arrow-plant", "arrow-question", "arrow-result"])
      .join("marker")
      .attr("id", (d) => d)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 30)
      .attr("refY", 0)
      .attr("markerWidth", 6)
      .attr("markerHeight", 6)
      .attr("orient", "auto")
      .append("path")
      .attr("fill", "#055A39") // Warna arrow
      .attr("d", "M0,-5L10,0L0,5");

    // Links with enhanced styling
    const link = g
      .append("g")
      .selectAll("line")
      .data(allLinks)
      .join("line")
      .attr("stroke", "#055A39") // Warna garis
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", (d: any) => {
        if (d.type === "final-result") return 3;
        return d.type === "question-sequence" ? 2 : 1.5;
      })
      .attr("stroke-dasharray", (d: any) => {
        if (d.type === "final-result") return "none";
        return d.type === "question-sequence" ? "5,5" : "none";
      })
      .attr("marker-end", (d: any) => {
        if (d.type === "final-result") return "url(#arrow-result)";
        return d.type === "question-sequence"
          ? "url(#arrow-question)"
          : "url(#arrow-plant)";
      });

    // Nodes with distinct styling for questions and plants
    const node = g
      .append("g")
      .selectAll("g")
      .data(allNodes)
      .join("g")
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended) as any
      );

    // Node circles with enhanced styling
    node
      .append("circle")
      .attr("r", (d: any) => {
        if (d.group === 2) return 15;
        return d.id === result?.nama ? 18 : 12;
      })
      .attr("fill", (d: any) => {
        // Check if it's a plant node
        const isPlant = !d.id.startsWith("q");
        if (isPlant) {
          return "#055A39"; // Color for plants
        }

        // Logic for answered questions
        const questionInHistory = questionHistory?.find((q) => q.id === d.id);
        if (questionInHistory) {
          // Use the stored answer to determine color
          // Note: Changed the condition to explicitly check for answer values
          if (questionInHistory.answer === 0) {
            return "#C50043"; // Red for "No" answers
          } else if (questionInHistory.answer === 1) {
            return "#064359"; // Blue for "Yes" answers
          }
        }

        // Current question color
        if (d.id === currentQuestion?.id) {
          return "#6D275D";
        }

        // Default color for unanswered questions
        return "#064359";
      })
      .attr("stroke", (d: any) => {
        // Check if it's a plant node
        const isPlant = !d.id.startsWith("q");
        if (isPlant) {
          return "#adf7b6";
        }

        // Logic for answered questions
        const questionInHistory = questionHistory?.find((q) => q.id === d.id);
        if (questionInHistory) {
          // Use the stored answer to determine stroke color
          // Note: Changed the condition to explicitly check for answer values
          if (questionInHistory.answer === 0) {
            return "#ffc09f"; // Coral stroke for "No" answers
          } else if (questionInHistory.answer === 1) {
            return "#a0ced9"; // Light blue stroke for "Yes" answers
          }
        }

        // Current question stroke
        if (d.id === currentQuestion?.id) {
          return "#a594f9";
        }

        // Default stroke for unanswered questions
        return "#a0ced9";
      })
      .attr("stroke-width", 8);

    // Labels
    node
      .append("text")
      .attr("dy", 30)
      .attr("text-anchor", "middle")
      .attr("fill", "#064359")
      .style("font-size", (d: any) => {
        if (d.id === currentQuestion?.id || d.id === result?.nama)
          return "14px";
        return "12px";
      })
      .style("font-weight", (d: any) => {
        if (d.id === currentQuestion?.id || d.id === result?.nama)
          return "bold";
        return "normal";
      })
      .text((d: Node) => {
        // Cek apakah ini node tanaman
        const isPlant = !d.id.startsWith("q");
        if (isPlant) {
          return d.id; // Tampilkan nama tanaman
        }

        // Untuk node pertanyaan, cari pertanyaan yang sesuai dari graphData
        const questionNode = graphData.nodes.find((node) => node.id === d.id);
        if (questionNode && questionNode.teks) {
          // Batasi panjang teks jika terlalu panjang
          const text = questionNode.teks;
          return text;
        }

        return d.id; // Fallback ke id jika tidak ditemukan teks pertanyaan
      });
    // Drag functions
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

    // Update positions
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`);
    });

    // Initial transform
    const initialScale = 0.8;
    const initialTransform = d3.zoomIdentity
      .translate(width / 40, height / 40)
      .scale(initialScale);
    svg.call(zoom as any).call(zoom.transform as any, initialTransform);

    return () => {
      simulation.stop();
    };
  }, [
    dimensions,
    filteredGraph,
    currentQuestion,
    possiblePlants,
    result,
    questionHistory,
  ]);

  const router = useRouter();

  return (
    <>
      <header className="h-20 fixed justify-between top-0 bg-jewel-green w-full flex px-8 items-center">
        <button
          onClick={() => router.push("/")}
          className="text-pastel-green rounded-xl font-black p-2 bg-jewel-green border-2 border-pastel-green"
        >
          {"<-"}
        </button>
        <h1 className="md:text-xl text-base tracking-wide font-display text-center text-white">
          Sistem Pakar Tanaman Monokotil
        </h1>
        <button className="text-pastel-green opacity-0 rounded-xl font-black p-2  bg-jewel-green border-2 border-pastel-green">
          {"<-"}
        </button>
      </header>
      <div className="min-h-screen flex md:flex-row flex-col items-center justify-center gap-4 md:gap-10 px-8 bg-pastel-green ">
        {/* Graf Kontainer */}
        <div className="md:h-[600px] mt-16 h-[300px] w-full md:w-full bg-white rounded-xl border-jewel-blue border-2 shadow-md overflow-hidden">
          <div ref={containerRef} className="w-full h-full">
            <svg ref={svgRef} />
          </div>
        </div>

        {/* Pertanyaan Kontainer */}
        <div className="flex items-center justify-center h-full w-full">
          {result ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full w-full border-jewel-blue border-2">
              <img
                src={result.gambar}
                alt={result.nama}
                className="w-full h-48 object-cover"
              />
              <div className="p-6 h-full">
                <h2 className="text-2xl text-center text-jewel-green font-black mb-2">
                  {result.nama}
                </h2>
                <p className="text-black mb-4">{result.deskripsi}</p>
                <button
                  onClick={handleReset}
                  className="w-full bg-jewel-green border-2 border-pastel-green hover:bg-pastel-green hover:border-jewel-green hover:text-jewel-green text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.01]"
                >
                  Mulai Ulang
                </button>
              </div>
            </div>
          ) : currentQuestion ? (
            <div className="bg-white rounded-xl shadow-md overflow-hidden w-full border-jewel-blue border-2">
              <div className="p-6">
                <h3 className="text-xl font-bold text-jewel-purple mb-2">
                  {currentQuestion.teks}
                </h3>
                <p className="text-gray-600 mb-4">
                  {currentQuestion.deskripsi}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleAnswer(1)}
                    className="flex-1 bg-jewel-blue border-2 text-pastel-blue border-pastel-blue hover:bg-pastel-blue hover:border-jewel-blue hover:text-jewel-blue font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.01]"
                  >
                    Ya
                  </button>
                  <button
                    onClick={() => handleAnswer(0)}
                    className="flex-1 bg-jewel-red text-pastel-red border-2 border-pastel-red hover:bg-pastel-red hover:border-jewel-red hover:text-jewel-red font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.01]"
                  >
                    Tidak
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full p-6 text-center">
              <p className="text-lg text-gray-800 mb-4">
                Tidak dapat mengidentifikasi tanaman.
              </p>
              <button
                onClick={handleReset}
                className="bg-jewel-purple border-2 text-pastel-purple border-pastel-purple hover:bg-pastel-purple hover:border-jewel-purple hover:text-jewel-purple  font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.01]"
              >
                Mulai Ulang
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ExpertSystemWithGraph;
