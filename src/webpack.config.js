const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
                outputStyle: 'compressed',
                sassOptions: {
                  includePaths: ['./node_modules'],
                  outputStyle: 'compressed',
                  outFile: path.resolve(__dirname, 'build/style.css'),
                },
              },
          },
        ],
      },
    ],
  },
};
