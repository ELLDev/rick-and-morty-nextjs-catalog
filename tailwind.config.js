module.exports = {
  content: ["./src/**/*.tsx", "./pages/**/*.tsx"],
  theme: {
    fontFamily: {
      'RickAndMorty': ['RickAndMorty'],
      'Roboto': ['Roboto'],
      'NanumGothic': ['Nanum Gothic']
    },
    extend: {
      saturate: {
        125: '1.25',
      },
      dropShadow: {
        // 'outlined': [
        //   '-1px 1px 0 #000',
        //   '1px 1px 0 #000',
        //   '1px -1px 0 #000',
        //   // '-1px -1px 0 #000'
        // ],
        'outlined': [
          '-1px 1px 0 #000',
          '1px 1px 0 #000',
          '1px -1px 0 #000',
          // '-1px -1px 0 #ff'
        ],
        // 'outlined': [
        //   '-1px 1px 0 #bedf6c',
        //   '1px 1px 0 #bedf6c',
        //   '1px -1px 0 #bedf6c',
        //   // '-1px -1px 0 #bedf6c'
        // ]
      },
      colors: {
        transparent: 'transparent',
      },
    },
  },
  plugins: [],
}
