/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#3e0211",
        "primary-container": "#5a1725",
        "on-primary": "#ffffff",
        "on-primary-container": "#da7c89",
        "primary-fixed": "#ffd9dc",
        "primary-fixed-dim": "#ffb2bb",
        "brand-pink": "#E60067",
        "brand-pink-hover": "#c80058",
        "brand-pink-light": "#fff0f5",
        "secondary": "#645e53",
        "secondary-container": "#ebe1d3",
        "on-secondary-container": "#6a6459",
        "surface": "#fbf9f8",
        "surface-bright": "#fbf9f8",
        "surface-dim": "#dbdad9",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#f5f3f3",
        "surface-container": "#efeded",
        "surface-container-high": "#e9e8e7",
        "surface-container-highest": "#e4e2e2",
        "card-warm": "#F5EBDD",
        "card-border": "#E5DED4",
        "on-surface": "#1b1c1c",
        "on-surface-variant": "#544244",
        "outline": "#867274",
        "outline-variant": "#d9c1c2",
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "success": "#15803d",
        "success-bg": "#f0fdf4",
        "warning": "#b45309",
        "warning-bg": "#fffbeb"
      },
      fontFamily: {
        "sans": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "sans-serif"],
        "body-main": ["Inter", "sans-serif"],
        "kpi-value": ["Inter", "sans-serif"],
        "page-title": ["Inter", "sans-serif"],
        "card-heading": ["Inter", "sans-serif"],
        "section-heading": ["Inter", "sans-serif"]
      },
      fontSize: {
        "label-caps": ["11px", { lineHeight: "1", letterSpacing: "0.08em", fontWeight: "700" }],
        "body-main": ["14px", { lineHeight: "1.6", fontWeight: "400" }],
        "kpi-value": ["30px", { lineHeight: "1.1", letterSpacing: "-0.01em", fontWeight: "700" }],
        "page-title": ["32px", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
        "card-heading": ["16px", { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "600" }],
        "section-heading": ["22px", { lineHeight: "1.3", fontWeight: "600" }]
      }
    },
  },
  plugins: [],
}
