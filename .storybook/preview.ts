import type {Preview} from '@storybook/web-components-vite';

import '../src/index';
import '../src/widgets.scss';

const preview: Preview = {
    parameters: {
        docs: {
            source: {
                transform: async (source: string) => {
                    // @ts-ignore
                    const prettier = await import('prettier/standalone');
                    // @ts-ignore
                    const prettierPluginBabel = await import('prettier/plugins/babel');
                    // @ts-ignore
                    const prettierPluginEstree = await import('prettier/plugins/estree');

                    return prettier.format(source, {
                        parser: 'babel',
                        plugins: [prettierPluginBabel, prettierPluginEstree],
                    });
                },
            },
            codePanel: true,
        },
    },
};

export default preview;

import * as ECharts from "echarts";
window.echarts = ECharts;
