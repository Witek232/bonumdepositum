/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        parchment: '#F9F7F1',
        ink: '#1A1A1A',
        faded: '#5C5C5C',
        wood: '#1C1410',
        woodLight: '#231C16',
        ivory: '#EAE0D0',
        ivoryMuted: '#A89F91',
        deepRed: '#8B0000',
        deepRedHover: '#A00000',
      },
      boxShadow: {
        'book': '4px 4px 10px rgba(0,0,0,0.1)',
        'book-dark': '0 4px 15px rgba(0,0,0,0.4)',
      }
    },
  },
  plugins: [],
};
