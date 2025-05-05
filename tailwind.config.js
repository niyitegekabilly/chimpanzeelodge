/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        green: {
          50: '#f0f9f1',
          100: '#dcf0df',
          200: '#bbe0bf',
          300: '#92ca9a',
          400: '#65ad71',
          500: '#478f53',
          600: '#3B824A',
          700: '#2D5E2E',
          800: '#234f27',
          900: '#1a3a1e',
        },
        amber: {
          50: '#fffaeb',
          100: '#fff0c6',
          200: '#ffe083',
          300: '#ffc94d',
          400: '#ffb726',
          500: '#F9A826',
          600: '#e58b0b',
          700: '#8B5A2B',
          800: '#724609',
          900: '#432a05',
        },
      },
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};