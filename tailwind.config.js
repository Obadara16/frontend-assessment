// tailwind.config.js
const flowbite = require('flowbite/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,ts,jsx,tsx}',  
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,  
  ],
};

