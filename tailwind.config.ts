
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
        // Purple palette for consistent design
        "rdp-blue": "#6366f1",
        "rdp-blue-light": "#818cf8",
        "rdp-dark": "#1F2937",
        "rdp-purple": "#9b87f5",
        "rdp-purple-light": "#b8a8f8",
        "rdp-purple-dark": "#7E69AB",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        notion: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        "notion-lg": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0", opacity: "0" },
          to: { height: "var(--radix-accordion-content-height)", opacity: "1" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)", opacity: "1" },
          to: { height: "0", opacity: "0" },
        },
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9)" },
          "100%": { transform: "translate(0px, 0px) scale(1)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shine: {
          "100%": { left: "125%" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blob: "blob 7s infinite ease-in-out",
        "fade-in": "fade-in 0.6s ease-out",
        shine: "shine 1.5s",
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      transitionDelay: {
        "2000": "2000ms",
        "4000": "4000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
