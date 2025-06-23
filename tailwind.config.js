/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './templates/**/*.html',
    './static/**/*.js',
    './static/**/*.css',
  ],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#1976d2',
        'brand-secondary': '#4fc3f7',
        'brand-accent': '#81c784',
        'brand-dark': '#181c24',
        'brand-light': '#f4f4f4',
        'brand-error': '#ff0033',
        'brand-success': '#00ff6a',
        'brand-warning': '#ffb300',
        'brand-info': '#4fc3f7',
        'brand-muted': '#b0bec5',
        'brand-dark-text': '#f4f4f4',
        'brand-light-text': '#23272f',
      },
      fontFamily: {
        brand: [
          'Segoe UI', 'Roboto', 'Open Sans', 'Arial', 'sans-serif'
        ],
      },
      borderRadius: {
        brand: '24px',
        'brand-lg': '32px',
        'brand-md': '16px',
      },
      boxShadow: {
        brand: '0 4px 32px #1976d233, 0 1.5px 8px #23272f44',
        'brand-card': '0 2px 12px #e3f2fd',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #1976d2 0%, #4fc3f7 100%)',
        'brand-gradient-dark': 'linear-gradient(135deg, #23272f 0%, #1976d2 100%)',
        'brand-bg-pattern': 'repeating-linear-gradient(135deg, #23272f 0 2px, #181c24 2px 40px)',
      },
    },
  },
  plugins: [],
}
