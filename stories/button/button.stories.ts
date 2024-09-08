import {Meta, StoryObj} from '@storybook/web-components';
import {mdiFlask, mdiTestTube} from '@mdi/js';

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

export const CriticalDisabled: StoryObj = {
  render: () => `
    <wct-button id="test-button" variant="critical" disabled>Example</wct-button>
    <br>
    <br>
    <wct-button variant="understated" onClick="document.querySelector('#test-button').removeAttribute('disabled')">Enable</wct-button>
    <wct-button variant="understated" onClick="document.querySelector('#test-button').setAttribute('disabled', '')">Disable</wct-button>
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

export const WithSuffixIcon: StoryObj = {
  render: (args) => `
    <wct-button icon="${args.icon}">
      Example
      <wct-icon slot="suffix" icon="${args.suffixIcon}"></wct-icon>
    </wct-button>
  `,
  args: {
    icon: mdiTestTube,
    suffixIcon: mdiFlask,
  }
}
