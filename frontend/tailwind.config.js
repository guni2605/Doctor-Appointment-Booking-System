/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
     // #5f6fff
      colors:{
        'primary': '#94a3b8',
        'secondary' : '#e7e8ea'
      }
    },
    
  },
  plugins: [],
}

