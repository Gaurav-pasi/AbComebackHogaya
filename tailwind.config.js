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
        // Category colors
        javascript: '#F7DF1E',
        nodejs: '#339933',
        express: '#000000',
        sql: '#336791',
        dsa: '#FF6B6B',
        architecture: '#4ECDC4',

        // Difficulty colors
        beginner: '#4CAF50',
        easy: '#4CAF50',
        intermediate: '#FF9800',
        medium: '#FF9800',
        advanced: '#F44336',
        hard: '#F44336',

        // Status colors
        not_started: '#9E9E9E',
        in_progress: '#2196F3',
        completed: '#4CAF50',
        mastered: '#9C27B0',

        // Theme colors
        primary: {
          50: '#f0f4ff',
          100: '#e0e9ff',
          200: '#c7d6fe',
          300: '#a5bbfc',
          400: '#8197f8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
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
