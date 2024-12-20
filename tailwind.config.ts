import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "jewel-green": "#055A39",
        "jewel-blue": "#064359",
        "jewel-red": "#C50043",
        "jewel-yellow": "#F3A51A",
        "jewel-purple": "#6D275D",

        "pastel-green": "#adf7b6",
        "pastel-blue": "#a0ced9",
        "pastel-red": "#ffc09f",
        "pastel-yellow": "#ffee93",
        "pastel-purple": "#a594f9",
      },
    },
  },
  plugins: [],
} satisfies Config;
