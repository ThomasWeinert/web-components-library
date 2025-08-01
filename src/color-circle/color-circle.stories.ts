import {Meta, type StoryObj} from "@storybook/web-components";
import {html} from "lit";

const meta: Meta = {
    title: 'Components/ColorCircle',
    component: 'wct-color-circle',
    parameters: {
        layout: 'centered',
    }
}
export default meta;

export const ColorCircle: StoryObj = {
    render: () => {
        return html`
            <wct-color-circle
                style="width: max(200px, min(90vw, calc(90vh - 100px)))"></wct-color-circle>`;
    },
    args: {
    },
    argTypes: {
        value: {
            control: false,
            table: {
                disable: true
            }
        }
    }
}
