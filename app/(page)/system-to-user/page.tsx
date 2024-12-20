"use client";

import React from "react";
import { useExpertSystem } from "@/app/utils/logika-sistem-pakar";

const ExpertSystem = () => {
  const { currentQuestion, result, handleAnswer, handleReset } =
    useExpertSystem();

  if (result) {
    return (
      <div className="space-y-4">
        <img
          src={result.gambar}
          alt={result.nama}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h2 className="text-xl font-bold">{result.nama}</h2>
        <p>{result.deskripsi}</p>
        <button onClick={handleReset} className="w-full">
          Mulai Ulang
        </button>
      </div>
    );
  }

  return (
    <>
      {currentQuestion ? (
        <div className="space-y-4">
          <div className="text-lg font-medium">{currentQuestion.teks}</div>
          <p className="text-gray-600">{currentQuestion.deskripsi}</p>
          <div className="flex gap-4">
            <button onClick={() => handleAnswer(1)} className="flex-1">
              Ya
            </button>
            <button onClick={() => handleAnswer(0)} className="flex-1">
              Tidak
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-lg mb-4">Tidak dapat mengidentifikasi tanaman.</p>
          <button onClick={handleReset}>Mulai Ulang</button>
        </div>
      )}
    </>
  );
};

export default ExpertSystem;
