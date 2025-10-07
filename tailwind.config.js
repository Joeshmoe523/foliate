/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
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
    require('flowbite/plugin'),
    require('flowbite-typography')
  ],
}
