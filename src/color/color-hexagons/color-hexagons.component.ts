import {customElement, property} from "lit/decorators.js";
import {styleMap} from "lit/directives/style-map.js";
import {classMap} from "lit/directives/class-map.js";
import {html, LitElement, TemplateResult, unsafeCSS} from "lit";
import styles from './color-hexagons.styles.scss?inline';
import {ColorValueEvent} from "../color-value-event";

const SQRT_3 = Math.sqrt(3);

export type ColorHexagonsMode = 'hue' | 'saturation' | 'lightness' | 'colorize' | 'decolorize' | 'darken' | 'lighten';
export const ColorHexagonsMode = {
    Hue: 'hue' as ColorHexagonsMode,
    Saturation: 'saturation' as ColorHexagonsMode,
    Lightness: 'lightness' as ColorHexagonsMode,
    Colorize: 'colorize' as ColorHexagonsMode,
    Decolorize: 'decolorize' as ColorHexagonsMode,
    Darken: 'darken' as ColorHexagonsMode,
    Lighten: 'lighten' as ColorHexagonsMode,
}

@customElement('wct-color-hexagons')
export class ColorHexagonsComponent extends LitElement {
    public static styles = unsafeCSS(styles);

    @property({type: Number, reflect: true})
    public steps: number = 9;


    private _hexagonRadius?: string;

    public get hexagonRadius(): string | undefined {
        return this._hexagonRadius;
    }

    @property({type: String, reflect: true, attribute: 'hexagon-radius'})
    public set hexagonRadius(value: string | undefined) {
        this._hexagonRadius = value;
        this.updateHexagonSize();
    }

    @property({type: Number, reflect: true})
    public hue: number = 0;

    @property({type: Number, reflect: true})
    public saturation: number = 1;

    @property({type: Number, reflect: true})
    public lightness: number = 0.5;

    @property({type: String, reflect: true})
    public mode: ColorHexagonsMode = ColorHexagonsMode.Darken;

    @property({type: String, reflect: true})
    public indent: 'odd' | 'even' = "even";

    @property({type: String, reflect: true})
    public direction: 'column' | 'row' = "row";

    private _resizeObserver = new ResizeObserver(
        () => this.updateHexagonSize(),
    );

    public connectedCallback() {
        super.connectedCallback();
        this._resizeObserver.observe(this);
    }

    public disconnectedCallback() {
        this._resizeObserver.disconnect();
        super.disconnectedCallback();
    }

    public render(): TemplateResult {
        this.updateHexagonSize();
        const steps = Array.from(Array(Math.max(this.steps, 1))).map(
            (_, index) => {
                let hue = this.hue;
                let saturation = this.saturation;
                let lightness = this.lightness;
                if (this.mode === ColorHexagonsMode.Hue) {
                    const stepValue = this.getStepValue(index, this.steps + 1, this.hue, this.hue + 360);
                    hue = stepValue >= 360 ? stepValue - 360 : stepValue;
                } else if (this.mode === ColorHexagonsMode.Lightness) {
                    lightness = this.getStepValue(index, this.steps, 1, 0);
                } else if (this.mode === ColorHexagonsMode.Saturation) {
                    saturation = this.getStepValue(index, this.steps, 1, 0);
                } else if (this.mode === ColorHexagonsMode.Colorize) {
                    saturation = this.getStepValue(index, this.steps, this.saturation, 1);
                } else if (this.mode === ColorHexagonsMode.Decolorize) {
                    saturation = this.getStepValue(index, this.steps, this.saturation, 0);
                } else if (this.mode === ColorHexagonsMode.Darken) {
                    lightness = this.getStepValue(index, this.steps, this.lightness, 0);
                } else {
                    lightness = this.getStepValue(index, this.steps, this.lightness, 1);
                }
                const color = `hsl(${hue}deg ${saturation * 100}% ${lightness * 100}%)`;

                const styles = styleMap(
                    {
                        '--hexagon-color': color,
                    }
                )
                return html`
                    <button style=${styles} @click="${() => this.emitColor(hue, saturation, lightness)}">${color}</button>`
            }
        )
        const classes = classMap({
            ground: true,
            'indent-odd': this.indent === 'odd',
            'indent-even': this.indent !== 'odd'
        })

        return html`
            <div class=${classes}>${steps}</steps>`
    }

    private getStepValue(index: number, steps: number, start: number, end: number): number {
        const length = Math.abs(end - start);
        if (start > end) {
            return Math.round((end - (length / (steps - 1) * index) + start) * 10000) / 10000;
        } else {
            return Math.round(((length / (steps - 1) * index) + start) * 10000) / 10000;
        }
    }

    private updateHexagonSize() {
        if (this._hexagonRadius && this._hexagonRadius !== '') {
            this.style.setProperty('--hexagon-radius', `${this._hexagonRadius}`);
            return;
        }
        const bounds = this.getBoundingClientRect();
        const containerLength = this.direction === 'column' ? bounds.height : bounds.width;
        const rowStepLength = this.steps % 2 === 0 ? (this.steps / 2) + 0.5 : Math.ceil(this.steps / 2);
        const innerRadius = containerLength / rowStepLength / 2;
        const outerRadius = Math.max(10, innerRadius / (SQRT_3 / 2));
        this.style.setProperty('--hexagon-radius', `${Math.round(outerRadius * 100) / 100}px`);
    }

    private emitColor( hue: number, saturation: number, lightness: number) {
      this.dispatchEvent(new ColorValueEvent('color-click', {}, {hue, saturation, lightness}));
    }
}
