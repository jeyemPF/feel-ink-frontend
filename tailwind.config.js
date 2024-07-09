/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFC107',
        secondary: '#FF9800',
        accent: '#$4343ds',
        error: '#F44336',
        abo: "#e5e7eb",
      },
      fontFamily: {
        sans: ['Poppins', 'Arial', 'sans-serif'],
      },
      maxHeight: {
        '6': '3em', // Adjust this value depending on your line-height and font-size
      },
      height: {
        '21rem': '21rem', // Adding custom height for 22rem
      },
    },
  },
  variants: {
    extend: {
      display: ['webkit-box'],
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.webkit-box': {
          display: '-webkit-box',
        },
        '.webkit-box-orient-vertical': {
          '-webkit-box-orient': 'vertical',
        },
        '.webkit-line-clamp-2': {
          '-webkit-line-clamp': '2',
        },
      });
    },
  ],
};
