/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        primaryHover: "#1d4ed8",

        background: "#f8fafc",
        surface: "#ffffff",

        textPrimary: "#0f172a",
        textSecondary: "#64748b",

        border: "#e2e8f0",
        danger: "#ef4444",
        success: "#22c55e",
      },
    },
  },
  plugins: [],
};