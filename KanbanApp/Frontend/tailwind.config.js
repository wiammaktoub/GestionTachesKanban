/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6", // bleu
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#8b5cf6", // violet
          foreground: "#ffffff",
        },
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-in-from-right": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.3s ease-in-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-in-out",
      },
    },
  },
  plugins: [],
};