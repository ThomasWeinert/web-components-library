import {Meta, StoryObj} from '@storybook/web-components';
import {mdiFlask, mdiTestTube} from '@mdi/js';
import {html} from "lit";
import { ArgumentControls } from "../argument-controls";
import { ButtonVariant } from "../../src/button/button-variant";

const meta: Meta = {
  title: "Components/Button",
  tags: ['dev'],
  component: 'wct-button',
  decorators: [],
};

export default meta;

export const Standard: StoryObj = {
  render: () => html`
    <wct-button>Example</wct-button>
  `,
}

export const Pill: StoryObj = {
  render: () => html`
    <wct-button shape="pill">Example</wct-button>
  `,
}

export const Emphasized: StoryObj = {
  render: () => html`
    <wct-button variant="emphasized">Example</wct-button>
  `,
}
export const Understated: StoryObj = {
  render: () => html`
    <wct-button variant="understated">Example</wct-button>
  `,
}

export const Variant: StoryObj = {
  render: (args) => html`
    <wct-button variant="${args.variant}">Example</wct-button>
  `,
  args: {
    variant: ButtonVariant.Critical
  },
  argTypes: {
    variant: ArgumentControls.selection(ButtonVariant, {controlType: "radio"})
  }
}

export const Disabled: StoryObj = {
  render: () => html`
    <wct-button id="test-button" variant="emphasized" disabled>Example</wct-button>
<br>
<br>
<wct-button variant="understated" onClick="document.querySelector('#test-button').disabled = false">Enable</wct-button>
<wct-button variant="understated" onClick="document.querySelector('#test-button').setAttribute('disabled', '')">Disable</wct-button>
  `,
}

export const WithIcon: StoryObj = {
  render: (args) => html`
    <wct-button icon="${args.icon}">Example</wct-button>
  `,
  args: {
    icon: mdiTestTube
  },
  argTypes: {
    ...ArgumentControls.hide('icon')
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
  },
  argTypes: {
    ...ArgumentControls.hide('icon', 'suffixIcon')
  }
}
