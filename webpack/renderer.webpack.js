module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.pdf']
  },
  module: {
    rules: require('./rules.webpack'),
  },
}