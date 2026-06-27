/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // 国家统计局风格配色方案
        primary: '#1e3a5f',      // 深蓝色 - 主色
        secondary: '#3182ce',    // 中蓝色 - 次要色
        background: '#f7fafc',   // 浅灰白 - 背景色
        surface: '#ffffff',      // 白色 - 卡片/表面
        text: '#1a202c',         // 深灰黑 - 主文本
        textSecondary: '#4a5568', // 次要文本
        border: '#e2e8f0',       // 边框灰
        accent: '#3182ce',       // 强调色
        accentHover: '#2c5282',  // 强调色悬停
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
