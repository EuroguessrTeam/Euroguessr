/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'yellow': '#FFE100',
      'yellow-light': '#FFF07D',
      'purple': '#3F1C6D',
      'purple-light': '#652CB2',
      'pink': '#FF47DD',
      'orange': '#FF7326',
      'blue': '#3A81E9',
      'gray': '#A6A6A6',
      'black': '#000000',
      'white': '#FFFFFF',
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      eurotype: ['Eurotype', 'sans-serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': {
            transform: 'scale(1)'
          },
            '50%': {
            transform: 'scale(1.1)'
          },
        }
      },
      animation: {
        wiggle: 'wiggle 1.5s ease-in-out infinite',
      }
    }
  },
  plugins: [],
}

