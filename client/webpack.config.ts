import path from 'path';
import { Configuration } from 'webpack';
import 'webpack-dev-server';

const config: Configuration = {
  context: path.join(__dirname, 'src'),
  entry: './index.tsx',
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  devtool: 'inline-source-map',
  devServer: {
    port: 3000,
  },
};

export default config;
