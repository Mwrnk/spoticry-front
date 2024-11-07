/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "scale-up4": "scale-up4 1s linear infinite",
      },
      keyframes: {
        "scale-up4": {
          "20%": { transform: "scaleY(1.5)", backgroundColor: "#fff" },
          "40%": { transform: "scaleY(1)" },
        },
      },
    },
  },
  plugins: [],
};
