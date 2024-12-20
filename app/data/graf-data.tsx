import { Pertanyaan } from "../types/monokotil";
import { TanamanMonokotil } from "../data/monokotil-data";

type Node = {
  id: string;
  teks?: string;
  group: number;
};

// Convert nodes
const nodes: Node[] = [
  ...Pertanyaan.map((question) => ({
    id: question.id,
    teks: question.teks,
    group: 1,
  })),
  ...TanamanMonokotil.map((plant) => ({
    id: plant.nama,
    group: 2,
  })),
];

// Convert links
const links = TanamanMonokotil.flatMap((plant) =>
  Object.entries(plant.ciri)
    .filter(([_, value]) => value === 1)
    .map(([questionId]) => ({
      source: questionId, // koneksi ke pertanyaan
      target: plant.nama, // koneksi ke tanaman monokotil
    }))
);

export const graphData = { nodes, links };
