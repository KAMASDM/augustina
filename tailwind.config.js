module.exports = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6F4F1",
          100: "#CCE9E4",
          200: "#99D3C8",
          300: "#66BDAC",
          400: "#33A790",
          500: "#009174",
          600: "#00745D",
          700: "#005746",
          800: "#003A2F",
          900: "#001D17",
        },
        secondary: {
          50: "#F3E6F9",
          100: "#E7CCF4",
          200: "#CF99E9",
          300: "#B866DE",
          400: "#A033D3",
          500: "#8800C8",
          600: "#6D00A0",
          700: "#520078",
          800: "#360050",
          900: "#1B0028",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
