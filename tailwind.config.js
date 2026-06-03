/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
    extend: {
      colors: {
        cream: {
          50: '#FEFDFB',
          100: '#FAF8F5',
          200: '#F5F1EB',
          300: '#EDE7DD',
          400: '#E0D6C8',
        },
        ink: {
          50: '#F5F5F5',
          100: '#D4D4D4',
          200: '#A3A3A3',
          300: '#737373',
          400: '#525252',
          500: '#404040',
          600: '#2C2C2C',
          700: '#1F1F1F',
          800: '#171717',
          900: '#0A0A0A',
        },
        vermilion: {
          50: '#FEEBE9',
          100: '#FCDDD8',
          200: '#F9BDB3',
          300: '#F49384',
          400: '#ED634E',
          500: '#B54434',
          600: '#93362A',
          700: '#782C22',
          800: '#65261E',
          900: '#56231C',
        },
        bronze: {
          50: '#FBF5EC',
          100: '#F7E9D5',
          200: '#EDD4AE',
          300: '#E0BA80',
          400: '#D4A056',
          500: '#A68A56',
          600: '#876D45',
          700: '#6D5738',
          800: '#5A4830',
          900: '#4B3C29',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Noto Serif SC', 'serif'],
        body: ['LXGW WenKai', 'Noto Serif SC', 'Georgia', 'serif'],
        art: ['Cormorant Garamond', 'serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.25' }],
        'display-xs': ['1.875rem', { lineHeight: '1.3' }],
        'body-lg': ['1.125rem', { lineHeight: '1.8' }],
        'body-base': ['1rem', { lineHeight: '1.85' }],
        'body-sm': ['0.875rem', { lineHeight: '1.75' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'sm': '0.125rem',
        'DEFAULT': '0.25rem',
        'md': '0.375rem',
        'lg': '0.5rem',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.08), 0 8px 24px rgba(0, 0, 0, 0.12)',
        'elegant': '0 2px 8px rgba(181, 68, 52, 0.08)',
        'elegant-lg': '0 8px 24px rgba(181, 68, 52, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
    },
  },
  plugins: [],
};
