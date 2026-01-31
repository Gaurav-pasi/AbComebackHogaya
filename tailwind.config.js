/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      colors: {
        // Ultra-soft, pastel primary colors - Gentle Teal
        primary: {
          50: '#f0fdfa',
          100: '#d1faf5',
          200: '#a8f5ec',
          300: '#6eebe0',
          400: '#3dd9c9',
          500: '#1fc2ae',
          600: '#14a89a',
          700: '#128a7e',
          800: '#126e65',
          900: '#135953',
        },

        // Ultra-soft accent color - Warm peach
        accent: {
          50: '#fff9f5',
          100: '#fff0e8',
          200: '#ffe4d4',
          300: '#ffc9a8',
          400: '#ffa876',
          500: '#ff8552',
          600: '#f56530',
          700: '#e04a1e',
          800: '#bc3d1a',
          900: '#9a351c',
        },

        // Ultra-soft purple for special states
        purple: {
          50: '#fbf7ff',
          100: '#f5edff',
          200: '#eddaff',
          300: '#ddb8ff',
          400: '#c88fff',
          500: '#b161ff',
          600: '#9d3fff',
          700: '#8526e8',
          800: '#6f21c3',
          900: '#5d1fa0',
        },

        // Category colors - Softer, pastel-inspired
        javascript: '#f7df1e',
        nodejs: '#68a063',
        express: '#444444',
        sql: '#4d88b3',
        dsa: '#ff8a80',
        architecture: '#6dd5c3',

        // Difficulty colors - Softer tones
        beginner: '#66bb6a',
        easy: '#66bb6a',
        intermediate: '#ffa726',
        medium: '#ffa726',
        advanced: '#ef5350',
        hard: '#ef5350',

        // Status colors
        not_started: '#9e9e9e',
        in_progress: '#42a5f5',
        completed: '#66bb6a',
        mastered: '#ab47bc',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
