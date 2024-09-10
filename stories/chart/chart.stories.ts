import { Meta, StoryObj } from '@storybook/web-components';
import { html } from "lit";
import { ChartComponent } from "../../src/chart/chart.component";
import { ArgumentControls } from "../argument-controls";

const meta: Meta = {
  title: "Components/Chart",
  tags: ['dev'],
  component: 'wct-echart',
};

export default meta;

export const Basic: StoryObj = {
  render: (args) => html`
    <wct-chart
      id="testChart"
      type="${args.type}"
      source-layout="row"
      style="width: 400px;"></wct-chart>
  `,
  play: ({canvasElement}) => {
    const chart = canvasElement.querySelector<ChartComponent>('#testChart');
    if (chart) {
      chart.source = [
        ['Months', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        ['Values', 150, 230, 224, 218, 135, 147, 260]
      ];
    }
  },
  args: {
    type: 'line'
  },
  argTypes: {
    type: ArgumentControls.selection(['line', 'bar'])
  }
}

export const Markdown: StoryObj = {
  render: (args) => html`
    <wct-chart
      type="${args.type}"
      style="width: 80vw;">
      |Products     |Shop 1|Shop 2|Shop 3|
      |shirt        |     5|    15|     7|
      |cardign      |    20|    22|    22|
      |chiffon shirt|    36|    31|    20|
      |pants        |    10|    12|    16|
      |heels        |    10|    15|     5|
      |socks        |    20|    20|    14|
    </wct-chart>
  `,
  args: {
    type: 'bar'
  },
  argTypes: {
    type: ArgumentControls.selection(['line', 'bar'])
  }
}
