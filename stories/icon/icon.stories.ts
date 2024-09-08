import {Meta, StoryObj} from '@storybook/web-components';
import {ButtonComponent} from "../../src/button/button.component";
import {Icon} from "../../src/icon/icon";
import {IconDefinition} from "../../src/icon/icon-definition";
import {mdiTestTube} from "@mdi/js";
import {html} from "lit";

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
