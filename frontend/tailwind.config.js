/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
  variants: {
    extend: {
      backgroundColor: ["active"],
      backgroundOpacity: ["active"],
      backdropFilter: ["hover", "focus"],
    },
  },
  corePlugins: {
    backdropFilter: true,
  },
};
