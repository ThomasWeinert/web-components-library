import {Meta, type StoryObj} from "@storybook/web-components";
import {html} from "lit";
import {styleMap} from 'lit/directives/style-map.js';
import {ColorCircleValueChange} from "./color-circle.component";
import {useArgs} from "storybook/preview-api";

const meta: Meta = {
    title: 'Components/ColorCircle',
    component: 'wct-color-circle',
    parameters: {
        layout: 'centered',
    }
}
export default meta;

export const ColorCircle: StoryObj = {
    render: (args) => {
        const [, updateArgs] = useArgs<{ value: {} }>();
        const onColorChange = (event: ColorCircleValueChange) => {
            const {hue, saturation, lightness} = event.detail;
            updateArgs({value: {hue, saturation, lightness}});
        }
        const colorValue = `hsl(${args.value.hue}deg ${args.value.saturation * 100}% ${args.value.lightness * 100}%)`;

        const colorValueStyles = {
            width: '200px',
            height: '100px',
            background: colorValue,
            margin: 'auto',
            '--color': colorValue
        };
        return html`
            <wct-color-circle style="width: max(200px, min(90vw, calc(90vh - 100px)))" @color-change=${onColorChange}></wct-color-circle>
            <div style=${styleMap(colorValueStyles)}></div>`;
    },
    args: {
        value: {hue: 0, saturation: 1, lightness: 0.5},
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
