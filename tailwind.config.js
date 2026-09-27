/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#070B14',
          900: '#0B1222',
          850: '#0E172A',
          800: '#111C35',
          750: '#152240',
          700: '#1E293B',
          600: '#334155',
          500: '#475569',
        },
        brand: {
          blue: '#2563EB',
          'blue-dark': '#1D4ED8',
          'blue-light': '#60A5FA',
          cyan: '#06B6D4',
          'cyan-dark': '#0097B2',
          'cyan-light': '#38BDF8',
          indigo: '#4F46E5',
          'indigo-dark': '#4338CA',
          'indigo-light': '#818CF8',
        },
        cyber: {
          blue: '#0284C7',
          sky: '#38BDF8',
          cyan: '#06B6D4',
          teal: '#0D9488',
        },
        flame: {
          amber: '#F59E0B',
          orange: '#EA580C',
          red: '#E11D48',
          sunset: '#FF6B00',
        }
      },
      boxShadow: {
        'glow-blue': '0 0 25px -4px rgba(37, 99, 235, 0.45)',
        'glow-cyan': '0 0 25px -4px rgba(6, 182, 212, 0.45)',
        'glow-indigo': '0 0 25px -4px rgba(79, 70, 229, 0.45)',
        'glow-emergency': '0 0 30px -4px rgba(234, 88, 12, 0.55)',
        'glow-emerald': '0 0 25px -4px rgba(16, 185, 129, 0.45)',
        'glass-card': '0 10px 30px -5px rgba(15, 23, 42, 0.06), 0 4px 10px -2px rgba(15, 23, 42, 0.04)',
        'glass-dark': '0 12px 36px -4px rgba(0, 0, 0, 0.5), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        heading: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 2.5s infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'aurora': 'aurora 10s ease infinite alternate',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'aurora': {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(20px, -20px) scale(1.05)' },
          '100%': { transform: 'translate(-20px, 15px) scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
}
