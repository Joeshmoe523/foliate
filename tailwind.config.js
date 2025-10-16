/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}',
    './app/components/**/*.{erb,haml,html,slim,rb}',
    './app/assets/stylesheets/**/*.css',
    './node_modules/flowbite/**/*.js'
  ],
  safelist: [
    {
      pattern: /rounded-(tl|tr|bl|br)-(sm|md|lg|xl|2xl|3xl)/,
    }
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'brand': {
          DEFAULT: '#02363D',
          highlight: '#176F6F',
          accent: '#E2F7F5',
          inverse: '#A8E6E1',
          hover: '#0D5256',
          active: '#218C88',
          'active-light': '#6FD6CE',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/line-clamp'),
    require('flowbite/plugin'),
    require('flowbite-typography')
  ],
}
