/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        gray: colors.coolGray,
        blue: colors.lightBlue,
        red: colors.rose,
        pink: colors.fuchsia,
      },
      fontFamily:{
        MontserratBlack: ['Montserrat-Black'],
        MontserratBold: ['Montserrat-Bold'],
        MontserratLight: ['Montserrat-Light'],
        MontserratItalic: ['Montserrat-Italic'],
        MontserratMedium: ['Montserrat-Medium'],
        MontserratRegular: ['Montserrat-Regular'],
        MontserratSemiBold: ['Montserrat-SemiBold'],
        MontserratThin: ['Montserrat-Thin'],
      }
    },
  },
  plugins: [],
}