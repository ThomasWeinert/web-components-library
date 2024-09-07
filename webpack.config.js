const path = require('path');

module.exports = {
  mode: "production",
  entry: {
    main: "./src/widgets.ts",
  },
  output: {
    path: path.resolve(__dirname, './build/widgets'),
    filename: "widgets.js"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      },
      {
        test: /\.styles.scss$/,
        exclude: /node_modules/,
        use: [
          "sass-to-string",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                style: "compressed",
              },
            },
          },
        ],
      },
      {
        test: /\.(scss|css)$/,
        exclude: [/\.styles.scss$/, /node_modules/],
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sassOptions: {
                style: "compressed",
              },
            },
          },
        ],
      },
    ]
  },
  externals: {
    'echarts': 'echarts',
  }
};
