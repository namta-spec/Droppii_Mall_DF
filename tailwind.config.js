/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./App.tsx', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      spacing: {
        5.5: '22px',
      },
      colors: {
        primary: {
          200: '#CCCCCC',
          900: '#1A1A1A',
        },
        blue: '#1877F1',
      },
      fontFamily: {
        MontserratBlack: ['Montserrat-Black'],
        MontserratBold: ['Montserrat-Bold'],
        MontserratLight: ['Montserrat-Light'],
        MontserratItalic: ['Montserrat-Italic'],
        MontserratMedium: ['Montserrat-Medium'],
        MontserratRegular: ['Montserrat-Regular'],
        MontserratSemiBold: ['Montserrat-SemiBold'],
        MontserratThin: ['Montserrat-Thin'],
      },
    },
  },
  plugins: [],
};
