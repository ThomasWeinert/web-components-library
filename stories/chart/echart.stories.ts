import { Meta, StoryObj } from '@storybook/web-components';
import { mdiTestTube } from "@mdi/js";
import { html } from "lit";
import { EChartComponent } from "../../src/chart/echarts/echart.component";

const meta: Meta = {
  title: "Components/Chart/EChart",
  tags: ['dev'],
  component: 'wct-echart',
};

export default meta;

export const Basic: StoryObj = {
  render: (args) => html`
    <wct-echart id="testChart" style="width: 400px;"></wct-echart>
  `,
  play: ({canvasElement}) => {
    const chart = canvasElement.querySelector<EChartComponent>('#testChart');
    if (chart) {
      chart.options = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        grid: {
         top: 10,
         right: 0,
         bottom: 30,
         left: 40,
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      }
    }
  },
  args: {
    icon: mdiTestTube
  }
}
