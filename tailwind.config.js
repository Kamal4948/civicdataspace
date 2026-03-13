/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        sans:  ['var(--font-sans)', 'ui-sans-serif', 'system-ui'],
        mono:  ['var(--font-mono)', 'ui-monospace'],
      },
      colors: {
        accent:  { DEFAULT: '#C84B1F', light: '#E85C26', bg: '#FEF0EB', border: '#F5CBBA' },
        ink:     { DEFAULT: '#1A1714', 2: '#3D3630', 3: '#6B6460', 4: '#9E9994', 5: '#C8C4BF' },
        sand:    { DEFAULT: '#FAF8F5', muted: '#F3F0EB', hover: '#EDE9E2' },
      },
      animation: {
        'fade-up': 'fadeUp 0.35s ease forwards',
        'shimmer': 'shimmer 1.8s infinite',
      },
      boxShadow: {
        'card':       '0 1px 3px rgba(26,23,20,0.05), 0 4px 12px rgba(26,23,20,0.04)',
        'card-hover': '0 4px 6px rgba(200,75,31,0.06), 0 12px 24px rgba(26,23,20,0.08)',
        'header':     '0 1px 0 #E8E3DC, 0 4px 16px rgba(26,23,20,0.04)',
      },
    },
  },
  plugins: [],
};
