/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#fcfaf6',
          dark: '#f6f1e7',
        },
        border: {
          DEFAULT: '#e9e2d3',
          light: 'rgba(246,241,231,0.8)',
        },
        ink: {
          DEFAULT: '#060708',
          secondary: '#404448',
          label: '#5a6065',
          input: '#111315',
          body: '#2c2f33',
        },
        brand: {
          DEFAULT: '#008800',
          dark: '#007200',
          light: '#b7eec4',
          soft: 'rgba(183,238,196,0.3)',
        },
        accent: {
          orange: '#ff8a5c',
        },
      },
      fontFamily: {
        heading: ['Geologica', 'sans-serif'],
        body: ['Roboto', 'sans-serif'],
      },
      borderRadius: {
        xl2: '28px',
        xl3: '32px',
      },
      boxShadow: {
        btn: '0px 1px 2px 0px rgba(0,190,95,0.2)',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        blob: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '33%': { transform: 'translate(16px, -20px) scale(1.08)' },
          '66%': { transform: 'translate(-14px, 14px) scale(0.95)' },
        },
        popIn: {
          '0%': { opacity: '0', transform: 'scale(0.85) translateY(16px)' },
          '60%': { opacity: '1', transform: 'scale(1.02) translateY(-2px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-8deg)' },
          '75%': { transform: 'rotate(8deg)' },
        },
        wobbleRing: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.55' },
          '50%': { transform: 'scale(1.15)', opacity: '0.15' },
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(0.16,1,0.3,1) both',
        'fade-in': 'fadeIn 0.8s ease-out both',
        float: 'float 6s ease-in-out infinite',
        blob: 'blob 12s ease-in-out infinite',
        'pop-in': 'popIn 0.4s cubic-bezier(0.34,1.56,0.64,1) both',
        wiggle: 'wiggle 0.6s ease-in-out',
        'wobble-ring': 'wobbleRing 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
