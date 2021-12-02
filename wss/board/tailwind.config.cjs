module.exports = {
  purge: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    colors: {
      transparent: 'var(--color-transparent)',
      white: 'var(--color-white)',
      black: 'var(--color-black)',
      neutral: {
        50: 'var(--color-neutral-50)',
        100: 'var(--color-neutral-100)',
        200: 'var(--color-neutral-200)',
        300: 'var(--color-neutral-300)',
        400: 'var(--color-neutral-400)',
        500: 'var(--color-neutral-500)',
        600: 'var(--color-neutral-600)',
        700: 'var(--color-neutral-700)',
        800: 'var(--color-neutral-800)',
        900: 'var(--color-neutral-900)',
      },
    },
  },
};
