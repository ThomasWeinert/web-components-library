import type { Preview } from '@storybook/web-components-vite'

import '../src/index';
import * as ECharts from "echarts";

import '../src/widgets.scss';

window.echarts = ECharts;

const preview: Preview = {
  parameters: {
  },
};

export default preview;
