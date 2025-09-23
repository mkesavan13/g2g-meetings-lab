/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary colors
        'primary-black': '#000000',
        'primary-white': '#FFFFFF',
        
        // Secondary colors
        'eucalyptus': '#008F5C',
        'ultramine': '#0672EF',
        
        // Accent colors
        'fountain-blue': '#00BCF5',
        'mantis': '#82CF5F',
        'passion-fruit': '#fbbd23',
        'mandarin': '#ff7a3f',
        'scarlet': '#FF3A65',
        'purple-heart': '#6B32CA',
        'velvet-grey': '#767676',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-in': 'slideIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
