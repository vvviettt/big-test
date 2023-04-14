/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ffffff",
        secondary: "#eff3f4",
        text: "#0f1419",
        textSecondary: "#536471",
        highlight: "#1d9bf0",
      },
    },
  },
  plugins: [],
};
