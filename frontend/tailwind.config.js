module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rust-orange': '#e04d1a',
        'charcoal': '#0f0f0f',
        'ash': '#2d2d2d',
        'ember': '#ff6a33',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif'],
        'bebas': ['Bebas Nova', 'sans-serif'],
      },
      spacing: {
        'vh': '100vh',
      },
      fontSize: {
        'xxl': '1.75rem',
      },
    },
  },
  plugins: [],
};
