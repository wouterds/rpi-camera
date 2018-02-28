module.exports = context => {
  return {
    parser: false,
    map: context.env !== 'production' ? context.map : false,
    from: context.from,
    to: context.to,
    plugins: {
      'postcss-pseudoelements': {},
      'postcss-import': {
        root: './src/styles',
        skipDuplicates: true,
      },
      'postcss-mixins': {},
      'postcss-cssnext': {},
      'postcss-nested': {},
      'postcss-hexrgba': {},
      'postcss-custom-media': {},
      'postcss-reporter': {
        clearMessages: true,
      },
    },
  };
};
