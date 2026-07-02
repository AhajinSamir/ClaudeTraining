import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

// Brand colour tokens — sourced from design.md §2
// NOTE: Tailwind v4 is CSS-first; these tokens are also declared via @theme in src/app/globals.css.
// This file adds the shadow-card plugin and serves as a JS-side reference for the design system.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          "deep-purple": "#460073",
          purple: "#A100FF",
          "purple-dark": "#7500C0",
          "purple-tint": "#E5CCFF",
        },
        surface: {
          tint: "#F5EEFF",
        },
        neutral: {
          900: "#0F0F1A",
          500: "#4A4A5A",
        },
        "border-neutral": "#E8E8F0",
        success: {
          DEFAULT: "#00B388",
          text: "#00875F",
          bg: "#E6F9F4",
        },
        warning: {
          DEFAULT: "#FF6B35",
          text: "#C94F10",
          bg: "#FFF2EC",
        },
        error: {
          text: "#B5001F",
          bg: "#FFEDF0",
        },
        info: {
          text: "#2A5CC7",
          bg: "#EEF4FF",
        },
        "neutral-badge": {
          text: "#4A4A5A",
          bg: "#F0F0F6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".shadow-card": {
          boxShadow: "0 1px 4px rgba(70, 0, 115, 0.06)",
        },
        ".shadow-card-hover": {
          boxShadow: "0 8px 32px rgba(70, 0, 115, 0.13)",
        },
      })
    }),
  ],
}

export default config
