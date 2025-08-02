import {Meta, type StoryObj} from "@storybook/web-components";
import {ArgumentControls} from "../../../.storybook/argument-controls";
import {html} from "lit";
import {ifDefined} from "lit/directives/if-defined.js";
import {action} from "storybook/actions";

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
        mode: ArgumentControls.selection(['hue' , 'colorize', 'decolorize' , 'darken', 'lighten'], {optional: true}),
        hexagonRadius: ArgumentControls.selection(['20', '40'], {optional: true}),
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
        mode: 'darken',
    }
}

export const Lighten: StoryObj = {
    ...Basic,
    args: {
        mode: 'lighten',
    }
}

export const Hue: StoryObj = {
    ...Basic,
    args: {
        mode: 'hue',
    }
}

export const Decolorize: StoryObj = {
    ...Basic,
    args: {
        mode: 'decolorize',
    }
}

export const FixedRadius: StoryObj = {
    ...Basic,
    args: {
        hexagonRadius: 40,
    }
}
