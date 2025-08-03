import {Meta, type StoryObj} from "@storybook/web-components";
import {ArgumentControls} from "../../../.storybook/argument-controls";
import {html} from "lit";
import {ifDefined} from "lit/directives/if-defined.js";
import {action} from "storybook/actions";
import {ColorHexagonsMode} from "./color-hexagons.component";

const meta: Meta = {
    title: 'Components/Color/ColorHexagons',
    component: 'wct-color-hexagons',
    parameters: {
        layout: 'centered',
    },
    args: {
        steps: 9
    },
    argTypes: {
        steps: ArgumentControls.range(3, 15),
        indent: ArgumentControls.selection(['odd', 'even'], {optional: true}),
        direction: ArgumentControls.selection(['row', 'column'], {optional: true}),
        mode: ArgumentControls.selection(ColorHexagonsMode, {optional: true}),
        hexagonRadius: ArgumentControls.selection(['20px', '40px', '2rem'], {optional: true}),
    }
}
export default meta;

export const Basic: StoryObj = {
    render: (args) => {
        return html`
            <wct-color-hexagons
                steps=${ifDefined(args.steps)}
                indent=${ifDefined(args.indent)}
                direction=${ifDefined(args.direction)}
                mode=${ifDefined(args.mode)}
                hexagon-radius=${ifDefined(args.hexagonRadius)}
                @color-click=${action('color-click')}
                style="width: 90vw; height: 90vh;"></wct-color-hexagons>`;
    },
}

export const Column: StoryObj = {
    ...Basic,
    args: {
        direction: 'column',
    }
}
export const Darken: StoryObj = {
    ...Basic,
    args: {
        mode: ColorHexagonsMode.Darken,
    }
}

export const Lighten: StoryObj = {
    ...Basic,
    args: {
        mode: ColorHexagonsMode.Lighten,
    }
}

export const Hue: StoryObj = {
    ...Basic,
    args: {
        mode: ColorHexagonsMode.Hue,
    }
}
export const Lightness: StoryObj = {
    ...Basic,
    args: {
        mode: ColorHexagonsMode.Lightness,
    }
}
export const Saturation: StoryObj = {
    ...Basic,
    args: {
        mode: ColorHexagonsMode.Saturation,
    }
}

export const Decolorize: StoryObj = {
    ...Basic,
    args: {
        mode: ColorHexagonsMode.Decolorize,
    }
}

export const FixedRadius: StoryObj = {
    ...Basic,
    args: {
        hexagonRadius: '40px',
    }
}
