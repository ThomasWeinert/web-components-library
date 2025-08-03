import {customElement, property, query} from "lit/decorators.js";
import {html, LitElement, TemplateResult, unsafeCSS} from "lit";
import styles from './color-wheel.styles.scss?inline';

@customElement('wct-color-wheel')
export class ColorWheelComponent extends LitElement {
    public static styles = unsafeCSS(styles);

    @property({type: Boolean, reflect: true, attribute: 'hide-value'})
    public hideValue: boolean = false;

    @property({type: Number, reflect: true})
    public hue: number = 0;

    @property({type: Number, reflect: true})
    public saturation: number = 1;

    @property({type: Number, reflect: true})
    public lightness: number = 0.5;

    @query('.wheel')
    private _wheel!: HTMLButtonElement;

    private handleWheelKeyPress(event: KeyboardEvent) {
        const lightnessMinimum = 0.4;
        const lightnessIncrement = (1 - lightnessMinimum) / 10;
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            const hue = Math.floor((this.hue - 30) / 30) * 30;
            this.hue = hue >= 0 ? (hue % 360) : 360 + (hue % 360);
        } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            const hue = Math.floor((this.hue + 30) / 30) * 30;
            this.hue = (hue % 360);
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            this.lightness = Math.max(lightnessMinimum, Math.min( 1, this.lightness + lightnessIncrement));
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            this.lightness = Math.max(lightnessMinimum, Math.min( 1, this.lightness - lightnessIncrement));
        }
    }

    private handleWheelClick(event: MouseEvent) {
        const bounds = this._wheel.getBoundingClientRect();
        const radius = bounds.width / 2;
        const x = event.offsetX - radius;
        const y = event.offsetY - radius;

        // calculate degrees around center
        let degrees = ((Math.atan2(y, x) * (180 / Math.PI)) + 90) % 360;
        if (degrees < 0) {
            degrees += 360;
        } else if (degrees > 359) {
            degrees -= 360;
        }

        // calculate distance from outer border
        const delta = 1 - Math.min(
            Math.sqrt(
                Math.abs(x) ** 2 + Math.abs(y) ** 2,
            ) / radius,
            1,
        );
        const distance = (delta >= 0.97) ? 1 : Math.floor(delta * 10) / 10;

        this.hue = ((Math.floor(degrees / 30) * 30) + 30);
        this.lightness = (0.6 * distance) + 0.4;
        console.log(this.hue, this.lightness);
    }

    public render(): TemplateResult {
        this.style.setProperty('--hue', `${this.hue}deg`);
        this.style.setProperty('--saturation', `${this.saturation * 100}%`);
        this.style.setProperty('--lightness', `${this.lightness * 100}%`);

        return html`<div class="ground">
            <button
                class="wheel"
                    @click=${this.handleWheelClick}
                    @keydown=${this.handleWheelKeyPress}>
            </button>
            ${!this.hideValue
                ? html`
                        <div class="value"></div>`
                : ''
            }
        </div>`
    }
}
