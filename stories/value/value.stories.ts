import {Meta, StoryObj} from '@storybook/web-components';
import {html} from "lit";

const meta: Meta = {
  title: "Components/Value",
  tags: ['dev'],
  component: 'wct-value',
};

export default meta;

export const Number: StoryObj = {
  render: () => html`
    <wct-value value="1234" format="number:1.0"></wct-value>
  `,
}
export const NumberFromContent: StoryObj = {
  render: () => html`
    <wct-value format="number:1.0">1234</wct-value>
  `,
}

export const NumberWithUnit: StoryObj = {
  render: () => html`
    <wct-value value="42" format="number:1.0:minute"></wct-value>
  `,
}
export const NumberWithUnitString: StoryObj = {
  render: () => html`
    <wct-value value="42" format="number:1.0:trees"></wct-value>
  `,
}

export const Currency: StoryObj = {
  render: () => html`
    <wct-value value="1234" format="currency:EUR:1.2"></wct-value>
  `,
}
export const CurrencyDE: StoryObj = {
  render: () => html`
    <wct-value lang="de" value="1234" format="currency:EUR:1.2"></wct-value>
  `,
}
