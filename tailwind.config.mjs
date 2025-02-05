/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8629d3", // Màu tím chính
        secondary: "#a029c7", // Màu gradient tím
        black: "#000000",
        white: "#FFFFFF",
      },
      spacing: {
        layout: "1.5rem", // Cố định khoảng cách giữa các div
      },
    },
  },
  plugins: [],
};
