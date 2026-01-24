const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./**/*.tsx'],
  darkMode: 'class',
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdffe5',
          100: '#f9ffc2',
          200: '#f2ff85',
          300: '#e8ff47',
          400: '#e1f505', // Electric Lemon (Brand)
          500: '#c2d600',
          600: '#99aa00',
          700: '#738000',
          800: '#525c00',
          900: '#383d00',
        },
        dark: {
          50: '#f4f4f5',
          100: '#e4e4e7',
          200: '#d4d4d8',
          300: '#a1a1aa',
          400: '#71717a',
          500: '#52525b',
          600: '#3f3f46',
          700: '#27272a',
          800: '#18181b', // Soft Gray
          900: '#111111', // Deep Charcoal
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        serif: ['Bitter', 'serif'], // Keeping for legacy support if needed
      },
      boxShadow: {
        'neo': '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '6px 6px 0px 0px rgba(0,0,0,1)',
        'neo-dark': '4px 4px 0px 0px rgba(255,255,255,1)', // For dark mode
      },
      borderWidth: {
        '3': '3px',
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
      },
    },
  },
  plugins: [customContainerPlugin, plugin(ellipisfyPlugin)],
};

function ellipisfyPlugin({ addUtilities }) {
  const styles = {
    '.ellipsify': {
      overflow: 'hidden',
      'text-overflow': 'ellipsis',
      'white-space': 'pre',
    },
  };

  addUtilities(styles);
}

function customContainerPlugin({ addComponents }) {
  addComponents({
    '.container': {
      '@screen lg': {
        maxWidth: '1024px',
      },
      '@screen xl': {
        maxWidth: '1280px', // Standardized wide container
      },
    },
  });
}
