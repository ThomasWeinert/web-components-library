import {StorybookConfig} from '@storybook/web-components-webpack5';
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-actions",
    "@storybook/addon-controls",
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-toolbars',
    '@storybook/addon-storysource'
  ],
  framework: {
    name: "@storybook/web-components-webpack5",
    options: {},
  },
  webpackFinal: async (configuration) => {
    return {
      ...configuration,
      module: {
        ...configuration.module,
        rules: [
          ...(configuration?.module?.rules || []),
          {
            test: /\.styles.scss$/,
            exclude: /node_modules/,
            use: [
              "sass-to-string",
              {
                loader: "sass-loader",
                options: {
                  sassOptions: {
                    outputStyle: "compressed",
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
              },
            ],
          },
        ],
      },
    };
  },
};
export default config;
