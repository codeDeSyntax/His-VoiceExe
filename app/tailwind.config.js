/** @type {import('tailwindcss').Config} */
export default {
  content: ["./public/index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#202020",
        secondary: "#2c2c2c",
        text: "#d7d7d7",
        quaternary: "#999999",
        info: "#007bff",
        success: "#28a745",
        warning: "#ffc107",
        accent: "#0f94b5",
      },
    },
    
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".scrollbar-hidden": {
            "-ms-overflow-style": "none" /* IE and Edge */,
            "scrollbar-width": "none" /* Firefox */,
          },
          ".scrollbar-hidden::-webkit-scrollbar": {
            display: "none" /* Chrome, Safari, and Opera */,
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
};
export const darkMode = 'class';
