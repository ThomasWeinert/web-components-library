import { Preview } from '@storybook/web-components';
import { themes } from "@storybook/theming";
import '!style-loader!css-loader!sass-loader!../src/widgets.scss';
import '!style-loader!css-loader!sass-loader!./preview.scss';

import * as echarts from "echarts";
import "../src/widgets";

window.echarts = echarts;

const preview: Preview = {
  tags: ['dev'],
  globalTypes: {
    theme: {
      description: 'UI Theme',
      defaultValue: 'light',
      toolbar: {
        title: 'Theme',
        icon: 'paintbrush',
        items: [
          { value: 'dark', title: 'Dark'},
          { value: 'light', title: 'Light'},
        ],
        dynamicTitle: true
      }
    }
  },
  decorators: [
    (story: any, context: any) => {
      const selectedTheme = context.globals.theme || 'light';
      const selectedThemeClass = 'theme-' + selectedTheme;
      document.body.classList.forEach(
        (name) => {
          if (name.startsWith('theme-') && name !== selectedThemeClass) {
            document.body.classList.remove(name);
          }
        }
      );
      if (!document.body.classList.contains(selectedThemeClass)) {
        document.body.classList.add(selectedThemeClass);
      }
      return story(context);
    },
  ],
  parameters: {
    layout: 'centered',
    docs: {
      theme: themes.dark,
    },
    // controls: {
    //   disableSaveFromUI: true,
    // },
    backgrounds: { disable: true },
    options: {
      name: 'QS Web Components',
      storySort: {
        method: 'alphabetical',
        order: ['Intro', 'Usage', 'Contributing', 'Components'],
        locales: '',
      },
    },
  }
};

export default preview;
