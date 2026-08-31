/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#A82468', light: '#C93E85', dark: '#851B52' },
        dark: { DEFAULT: '#1A1A1A', light: '#2D2D2D', muted: '#3A3A3A' },
        cream: { DEFAULT: '#FBF4F8', dark: '#F4E9EF' },
        ink: '#1A1A1A',
        muted: '#5E6472',
      },
      fontFamily: {
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
