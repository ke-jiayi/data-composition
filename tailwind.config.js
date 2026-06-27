/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Enable dark mode via class
  theme: {
    extend: {
      colors: {
        // Reference: sharmaabhishekk.github.io color scheme
        background: '#0a0a0a',     // Main background - almost pure black
        surface: '#171717',        // Card/surface background
        surfaceHover: '#262626',   // Hover state for surfaces
        border: '#303030',         // Border color
        textPrimary: '#fafafa',     // Primary text - near white
        textSecondary: '#a3a3a3',  // Secondary text - muted gray
        accent: '#3b82f6',          // Blue accent color
        accentHover: '#60a5fa',    // Accent hover color
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      width: {
        'sidebar': '280px',
      },
      maxWidth: {
        'content': '900px',
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-out',
        'slide-in': 'slide-in 200ms ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}