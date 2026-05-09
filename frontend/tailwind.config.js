/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      colors: {
        ink: '#07111f',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        brand: {
          50: '#ecfeff',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2'
        }
      },
      boxShadow: {
        glow: '0 0 45px rgba(34, 211, 238, 0.28)',
        premium: '0 24px 70px rgba(2, 6, 23, 0.22)'
      },
      backgroundImage: {
        mesh: 'radial-gradient(circle at 18% 16%, rgba(34,211,238,.32), transparent 30%), radial-gradient(circle at 82% 22%, rgba(244,114,182,.28), transparent 28%), radial-gradient(circle at 46% 78%, rgba(132,204,22,.22), transparent 32%)',
        aurora: 'linear-gradient(120deg, rgba(34,211,238,.35), rgba(168,85,247,.24), rgba(251,191,36,.22))'
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        glow: { '0%,100%': { opacity: '.65' }, '50%': { opacity: '1' } }
      },
      animation: {
        marquee: 'marquee 24s linear infinite',
        glow: 'glow 2.5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
