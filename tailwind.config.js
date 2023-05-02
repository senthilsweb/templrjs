
const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')
const formKitTailwind = require('@formkit/themes/tailwindcss')
module.exports = {
  mode: 'jit',
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "node_modules/tailvue/dist/tailvue.es.js"
  ],
  corePlugins: {
    // due to https://github.com/tailwindlabs/tailwindcss/issues/6602 - buttons disappear
    preflight: false,
  },
  darkMode: "class",
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#ffffff',
        //'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        fuchsia: colors.fuchsia,
        pink: colors.pink,
        purple: colors.purple,
        indigo: colors.indigo,
        emerald: colors.emerald,
        gray: colors.gray,
        red: colors.red,
        yellow: colors.yellow,
        green: colors.green,
        lime: colors.lime,
        cyan: colors.cyan,
        blue: colors.blue,
        purple: colors.purple,
        pink: colors.pink,
        rose: colors.rose,
        teal: colors.teal,
        orange: colors.orange,
        magenta: colors.magenta,
        primary: colors.green,
        secondary: colors.blue,
        footer: colors.slate,
        sy: colors.yellow,
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
    },
  },
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'group-hover'],
    backgroundColor: ['responsive', 'hover', 'focus', 'even', 'odd'],
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), formKitTailwind, require('@tailwindcss/aspect-ratio')],
};