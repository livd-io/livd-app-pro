import colors from "tailwindcss/colors"

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Soehne", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        neutral: colors.zinc,
        primary: colors.sky,
      },
    },
  },
  plugins: [],
};
