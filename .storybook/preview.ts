import type {Preview} from '@storybook/web-components-vite'

import '../src/index';
import '../src/widgets.scss';

const preview: Preview = {
    parameters: {
        docs: {
            codePanel: true,
        },
    },
};

export default preview;

import * as ECharts from "echarts";
window.echarts = ECharts;
