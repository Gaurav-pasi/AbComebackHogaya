/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Soft, aesthetic primary colors - Teal/Cyan palette
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },

        // Soft accent color - Warm coral/peach
        accent: {
          50: '#fff5f2',
          100: '#ffe8e0',
          200: '#ffd4c7',
          300: '#ffb8a1',
          400: '#ff9270',
          500: '#ff6b45',
          600: '#f04822',
          700: '#d63616',
          800: '#b02d15',
          900: '#922819',
        },

        // Soft purple for special states
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
          800: '#6b21a8',
          900: '#581c87',
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
