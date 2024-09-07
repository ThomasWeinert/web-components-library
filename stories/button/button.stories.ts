import {Meta, StoryObj} from '@storybook/web-components';
import {Icon} from "../../src/icon/icon";
import {mdiTestTube} from '@mdi/js';

const meta: Meta = {
  title: "Components/Button",
  tags: ['dev'],
  component: 'wct-button',
};

export default meta;

export const Standard: StoryObj = {
  render: () => `
    <wct-button>Example</wct-button>
  `,
}

export const Pill: StoryObj = {
  render: () => `
    <wct-button shape="pill">Example</wct-button>
  `,
}


export const Critical: StoryObj = {
  render: () => `
    <wct-button variant="critical">Example</wct-button>
  `,
}

export const WithIcon: StoryObj = {
  render: (args) => `
    <wct-button icon="${args.icon}">Example</wct-button>
  `,
  args: {
    icon: mdiTestTube
  }
}
