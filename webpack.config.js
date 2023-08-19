const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules|src\/API|dist/,
        use: {
          loader: 'babel-loader'
        }
      },{
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: ['eslint-loader'],
      }

    ]
  },
  resolve: {
    extensions: ['.js']
  },
  target: 'node', // Indica que o bundle será executado no ambiente Node.js,
  
};
