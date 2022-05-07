module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    theme: [
      {
        mytheme: {
         "primary": "#dca54c",
         "secondary": "#d1d5db",
         "accent": "#ef4444",
         "neutral": "#1D1721",
         "base-100": "#374151",
         "info": "#98BCDD",
         "success": "#4ade80",
         "warning": "#fef08a",
         "error": "#991b1b",
       },
      },
    ],
  },
  plugins: [ require( 'daisyui' ) ],
}
