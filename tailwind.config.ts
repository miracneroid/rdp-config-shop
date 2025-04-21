
import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // Enable class-based dark mode
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        notion: {
          text: "#37352f",
          "text-light": "#6b7280",
          background: "#ffffff",
          "background-light": "#f7f6f3",
          border: "#e5e5e5",
          "border-dark": "#d3d3d3",
        },
        // For dark mode
        "dark-bg": "#000000",
        "dark-text": "#FFFFFF",
        "dark-border": "#222222",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        notion: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        "notion-lg": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

