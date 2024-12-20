"use client";

import React from "react";
import { useExpertSystem } from "@/app/utils/logika-sistem-pakar";

const ExpertSystem = () => {
  const { currentQuestion, result, handleAnswer, handleReset } =
    useExpertSystem();

  if (result) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-100 to-green-200 p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full">
          <img
            src={result.gambar}
            alt={result.nama}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h2 className="text-2xl font-bold text-green-800 mb-2">{result.nama}</h2>
            <p className="text-gray-600 mb-4">{result.deskripsi}</p>
            <button
              onClick={handleReset}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
            >
              Mulai Ulang
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      {currentQuestion ? (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full">
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-2">{currentQuestion.teks}</h3>
            <p className="text-gray-600 mb-4">{currentQuestion.deskripsi}</p>
            <div className="flex gap-4">
              <button
                onClick={() => handleAnswer(1)}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Ya
              </button>
              <button
                onClick={() => handleAnswer(0)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                Tidak
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden max-w-md w-full p-6 text-center">
          <p className="text-lg text-gray-800 mb-4">Tidak dapat mengidentifikasi tanaman.</p>
          <button
            onClick={handleReset}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Mulai Ulang
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpertSystem;

