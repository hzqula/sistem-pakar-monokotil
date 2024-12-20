// pages/index.tsx
"use client";

import VisualisasiGraf from "./components/VisualisasiGraf";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const route = useRouter();

  return (
    <>
      <div className="w-full h-screen bg-jewel-green opacity-30 absolute top-0 left-0"></div>
      <div className="w-full h-screen blur-[2px] ">
        <VisualisasiGraf />;
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-4 bg-white border-2 border-jewel-green p-8 rounded-xl w-[90%] md:w-1/2">
        <h1 className="md:text-xl text-base font-black text-center text-jewel-green font-display tracking-wide">
          Sistem Pakar Tanaman Monokotil
        </h1>
        <button
          onClick={() => route.push("/system-to-user")}
          className="w-full bg-jewel-green border-2 border-pastel-green hover:bg-pastel-green hover:border-jewel-green hover:text-jewel-green text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-[1.01] "
        >
          Mulai
        </button>
      </div>
    </>
  );
};

export default HomePage;
