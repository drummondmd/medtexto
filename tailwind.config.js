/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        //"mt-primary": "#9aa6b2",
        "mt-primary": "#273f5b",
        //"mt-secondary": "#bcccdc",
        "mt-secondary": "#949492",
        "mt-bg": "#f5f5f7",
        "mt-yellow": "#efb036",
        "mt-walnut": "#6f481c",
      },
    },
  },
  plugins: [],
};
