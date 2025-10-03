/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    './App.tsx',
    './src/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontSize: {
        large: '32px',
      },
      spacing: {
        5.5: '22px',
        13: '52px',
        30: '122px',
      },
      colors: {
        primary: {
          0: '#FFFFFF',
          100: '#E6E6E6',
          200: '#CCCCCC',
          300: '#B3B3B3',
          400: '#999999',
          500: '#808080',
          900: '#1A1A1A',
        },
        blue: '#1877F2',
        red: '#ED1010',
        green: '#0C9409',
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
