/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './src/**/*.{html,ts}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'down-arrow': "url('/assets/icons/down-arrow.svg')",
        'search-sprite': "url('/assets/icons/search-sprite.svg')",
        'sign-in': "url('/assets/icons/sign-in.svg')",
        'add-to-cart': "url('/assets/icons/product-add-to-cart.svg')",
        'heart-icon': "url('/assets/icons/heart-icon.svg')"
      }
    },
  },
  plugins: [],
}