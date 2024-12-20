import { Pertanyaan } from "../types/monokotil";
import { TanamanMonokotil } from "../data/monokotil-data";

// Konversi nodes
const nodes = [
  ...Pertanyaan.map((question) => ({
    id: question.id,
    teks: question.teks,
    group: 1, // Group untuk pertanyaan
  })),
  ...TanamanMonokotil.map((plant) => ({
    id: plant.nama,
    group: 2, // Group untuk tanaman
  })),
];

// Konversi links
const links = TanamanMonokotil.flatMap((plant) =>
  Object.entries(plant.ciri)
    .filter(([_, value]) => value === 1)
    .map(([questionId]) => ({
      source: questionId, // Hubungkan dari pertanyaan
      target: plant.nama, // Ke tanaman
    }))
);

export const graphData = { nodes, links };
