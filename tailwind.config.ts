
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
        // Spotlight effect colors
        spotlight: {
          purple: "#8B5CF6",
          violet: "#7C3AED",
          indigo: "#4F46E5",
          white: "#FFFFFF",  // Add white for star-like effect
        },
      },
      fontFamily: {
        sans: ["Sora", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        notion: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
        "notion-lg": "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
        spotlight: "0 0 30px 10px rgba(255, 255, 255, 0.3)",  // Updated to be whiter
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
        spotlight: {
          "0%": {
            opacity: "0",
            transform: "scale(0.8) translate(-50%, -50%)"
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translate(-50%, -50%)"
          }
        },
        glow: {
          "0%": { boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.4)" },  // Whiter glow
          "50%": { boxShadow: "0 0 30px 15px rgba(255, 255, 255, 0.6)" }, // Whiter glow
          "100%": { boxShadow: "0 0 15px 5px rgba(255, 255, 255, 0.4)" }  // Whiter glow
        },
        star: {
          "0%": { opacity: "0.3", transform: "scale(0.95)" },
          "50%": { opacity: "1", transform: "scale(1.05)" },
          "100%": { opacity: "0.3", transform: "scale(0.95)" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        blob: "blob 7s infinite ease-in-out",
        "fade-in": "fade-in 0.6s ease-out",
        shine: "shine 1.5s",
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        spotlight: "spotlight 1.5s ease-out forwards",
        glow: "glow 3s infinite ease-in-out",
        star: "star 4s infinite ease-in-out",  // New animation for star effect
        float: "float 6s infinite ease-in-out",
      },
      transitionDelay: {
        "2000": "2000ms",
        "4000": "4000ms",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
