/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'anime-dark': '#0a0a0a',
        'anime-gray': '#1a1a1a',
        'anime-card': '#2a2a2a',
        'anime-accent': '#4ade80',
        'anime-blue': '#3b82f6',
      },
      fontFamily: {
        'anime': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}