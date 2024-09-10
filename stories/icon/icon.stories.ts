import { Meta, StoryObj } from '@storybook/web-components';
import { mdiTestTube } from "@mdi/js";
import { html } from "lit";
import { iconLibraries } from "../../src/icon/icon-library-service";

const meta: Meta = {
  title: "Components/Icon",
  tags: ['dev'],
  component: 'wct-icon',
};

export default meta;

export const Basic: StoryObj = {
  render: (args) => html`
    <wct-icon icon="${args.icon}"></wct-icon>
  `,
  args: {
    icon: mdiTestTube
  }
}
export const FontSize: StoryObj = {
  render: (args) => html`
    <div style="font-size: 48px">
      <wct-icon icon="${args.icon}"></wct-icon>
    </div>
  `,
  args: {
    icon: mdiTestTube
  }
}
export const IconSizeVariable: StoryObj = {
  render: (args) => html`
    <div style="--icon-size: 48px">
      <wct-icon icon="${args.icon}"></wct-icon>
    </div>
  `,
  args: {
    icon: mdiTestTube
  }
}
export const Library: StoryObj = {
  render: (args) => {
    iconLibraries.registerIcons(
      'test',
      {
        test_tube: mdiTestTube
      }
    );
    return html`
      <div style="font-size: 48px">
        <wct-icon icon="${args.icon}"></wct-icon>
      </div>
    `
  },
  args: {
    icon: 'test:test_tube'
  }
}
