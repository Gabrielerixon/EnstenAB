/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New Solar Racing Color Palette
        'solar': {
          'electric': '#00D4FF',
          'gold': '#FFB800', 
          'racing': '#FF0040',
          'carbon': '#0D1117',
          'slate': '#1C2128',
          'mist': '#F8FAFC',
        },
        // Legacy colors (for gradual migration)
        'ensten-black': '#0A0A0A',
        'ensten-orange': '#FF6B35',
        'ensten-blue': '#004E98',
        'ensten-gray': '#F7F7F7',
      },
      backgroundImage: {
        'solar-gradient': 'linear-gradient(135deg, #00D4FF 0%, #FFB800 100%)',
        'racing-gradient': 'linear-gradient(135deg, #FF0040 0%, #00D4FF 100%)',
        'carbon-gradient': 'linear-gradient(135deg, #0D1117 0%, #1C2128 100%)',
        'energy-flow': 'linear-gradient(90deg, transparent, #00D4FF, transparent)',
        'solar-burst': 'radial-gradient(circle at center, #FFB800 0%, transparent 70%)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'energy-flow': 'energy-flow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'fade-in': 'fade-in 0.8s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%': { boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(0, 212, 255, 0.8)' },
        },
        'energy-flow': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      fontFamily: {
        'racing': ['Orbitron', 'monospace'],
        'tech': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'electric': '0 0 30px rgba(0, 212, 255, 0.3)',
        'solar': '0 0 30px rgba(255, 184, 0, 0.3)',
        'racing': '0 0 30px rgba(255, 0, 64, 0.3)',
        'carbon': '0 20px 40px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};