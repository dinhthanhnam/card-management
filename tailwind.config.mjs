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
        primary: "#7dd3fc",
        secondary: "#0ea5e9",
        black: "#000000",
        white: "#FFFFFF",
      },
      spacing: {
        layout: "1.0rem", // Cố định khoảng cách giữa các div
      },
      fontFamily: {
        sans: ["Signika", "sans-serif"], // Đổi font mặc định
      },
      fontSize: {
        base: "16px",
        lg: "18px",
        xl: "20px",
      },
      fontWeight: {
        normal: "400",
        semibold: "500",
        bold: "600",
      },
    },
  },
  plugins: [],
};
