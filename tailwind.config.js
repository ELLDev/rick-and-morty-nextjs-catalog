module.exports = {
  content: ["./src/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    fontFamily: {
      'Roboto': ['Roboto'],
      'NanumGothic': ['Nanum Gothic']
    },
    extend: {
      keyframes: {
        bouncex: {
          '0%, 100%': { transform: 'translateX(-11%)', 'animation-timing-function': 'cubic-bezier(0.8, 0, 1, 1)' },
          '50%': { transform: 'translateX(0)', 'animation-timing-function': 'cubic-bezier(0, 0, 0.2, 1)' }
        },
      },
      animation: {
        bouncex: 'bouncex 1s infinite',
      },
      saturate: {
        125: '1.25',
      },
      dropShadow: {
        'outlined': [
          '-1px 1px 0 #000',
          '1px 1px 0 #000',
          '1px -1px 0 #000',
          '-1px -1px 0 #000'
        ],
      },
      colors: {
        transparent: 'transparent',
      },
    },
  },
  plugins: [],
}
