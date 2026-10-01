/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
    './public/**/*.{html,ts,scss}'
  ],

  theme: {
    extend: {
      colors: {
        'brand-dark': 'rgb(var(--color-brand-dark) / <alpha-value>)',
        'brand-black': 'rgb(var(--color-brand-black) / <alpha-value>)',
        'brand-white': 'rgb(var(--color-brand-white) / <alpha-value>)',

        'brand-red': 'rgb(var(--color-brand-red) / <alpha-value>)',
        'brand-amber': 'rgb(var(--color-brand-amber) / <alpha-value>)',

        'brand-gold': 'rgb(var(--color-brand-gold) / <alpha-value>)',
        'brand-gold-hover': 'rgb(var(--color-brand-gold-hover) / <alpha-value>)',
        'brand-gold-soft': 'rgb(var(--color-brand-gold-soft))',

        'ui-black': 'rgb(var(--color-ui-black))',
        'ui-surface': 'rgb(var(--color-ui-surface))',
        'ui-card': 'rgb(var(--color-ui-card))',
        'ui-elevated': 'rgb(var(--color-ui-elevated))',

        'ui-border': 'rgb(var(--color-ui-border))',
        'ui-border-soft': 'rgb(var(--color-ui-border-soft))',

        'text-table': 'rgb(var(--color-text-table))',
        'text-table-sub': 'rgb(var(--color-text-table-sub))',
        'text-primary': 'rgb(var(--color-text-primary))',
        'text-secondary': 'rgb(var(--color-text-secondary))',
        'text-muted': 'rgb(var(--color-text-muted))',
        'text-subtle': 'rgb(var(--color-text-subtle))'
      }
    }
  },

  plugins: []
};