module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        wiggle: 'wiggle 2.5s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-7deg)' },
          '50%': { transform: 'rotate(7deg)' },
        },
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#881337',
          secondary: '#7B92B2',
          accent: '#ffe4e6',
          neutral: '#181A2A',
          'base-100': '#f3f4f6',
          info: '#d1d5db',
          success: '#36D399',
          warning: '#fef08a',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
