/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: "#ECE7DD",
          dark: "#DED7C8",
        },
        ink: {
          DEFAULT: "#1C1B19",
          soft: "#55504A",
        },
        seal: {
          DEFAULT: "#7A2E2E",
          soft: "rgba(122, 46, 46, 0.08)",
          line: "rgba(122, 46, 46, 0.35)",
        },
        line: "#C9C0AF",
      },
      fontFamily: {
        mincho: ["'Shippori Mincho'", "serif"],
        sans: ["'Noto Sans JP'", "sans-serif"],
      },
      letterSpacing: {
        wide2: "0.15em",
        wide3: "0.25em",
      },
    },
  },
  plugins: [],
};
