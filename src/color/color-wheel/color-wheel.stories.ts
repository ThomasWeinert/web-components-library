import {Meta, type StoryObj} from "@storybook/web-components";
import {html} from "lit";

const meta: Meta = {
    title: 'Components/Color/ColorWheel',
    component: 'wct-color-wheel',
    parameters: {
        layout: 'centered',
    }
}
export default meta;

export const ColorWheel: StoryObj = {
    render: () => {
        return html`
            <wct-color-wheel
                style="width: max(200px, min(90vw, calc(90vh - 100px)))"></wct-color-wheel>`;
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
