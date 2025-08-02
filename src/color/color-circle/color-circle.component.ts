import {html, LitElement, PropertyValues, TemplateResult, unsafeCSS} from "lit";
import {customElement, property, query, state} from 'lit/decorators.js';
import styles from './color-circle.styles.scss?inline';
import {Subscriptions} from "../../events/subscriptions";
import {EventSubscription} from "../../events/event-subscription";
import {ColorValueEvent} from "../color-value-event";

const SQRT_3 = Math.sqrt(3);

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

@customElement('wct-color-circle')
export class ColorCircleComponent extends LitElement {
    public static styles = unsafeCSS(styles);

    @property({type: Number, reflect: true})
    public hue: number = 0;

    @property({type: Number, reflect: true})
    public saturation: number = 1;

    @property({type: Number, reflect: true})
    public lightness: number = 0.5;

    @state()
    private _ringSize: number = 40;

    @query('.circle')
    private _circle!: HTMLDivElement;

    @query('.triangle-container')
    private _triangle!: HTMLDivElement;

    private _circleChanging = false;

    private _subscriptions = new Subscriptions();
    private _triangleChanging = false;
    private _resizeObserver = new ResizeObserver(
        () => this.updateRingSize(),
    );

    @property({type: Boolean, reflect: true, attribute: 'hide-value'})
    public hideValue: boolean = false;

    connectedCallback() {
        super.connectedCallback();
        this._resizeObserver.observe(this);
        this._subscriptions.add(
            new EventSubscription<MouseEvent>(
                window,
                'mouseup',
                (event) => {
                    this.updateFromPosition(event.clientX, event.clientY);
                    this._circleChanging = false;
                    this._triangleChanging = false;
                }
            ),
            new EventSubscription<TouchEvent>(
                window,
                'touchend',
                (event) => {
                    const targetTouch = event.targetTouches[0];
                    if (targetTouch) {
                        const {clientX, clientY} = targetTouch;
                        this.updateFromPosition(clientX, clientY);
                    }
                    this._circleChanging = false;
                    this._triangleChanging = false;
                }
            ),
            new EventSubscription<MouseEvent>(
                window,
                'mousemove',
                (event) => {
                    this.updateFromPosition(event.clientX, event.clientY);
                }
            ),
            new EventSubscription<TouchEvent>(
                window,
                'touchmove',
                (event) => {

                    const targetTouch = event.targetTouches[0];
                    if (targetTouch) {
                        const {clientX, clientY} = targetTouch;
                        this.updateFromPosition(clientX, clientY);
                    }
                }
            )
        )
    }

    disconnectedCallback() {
        this._resizeObserver.disconnect();
        this._subscriptions.unsubscribe();
    }

    protected firstUpdated(_changedProperties: PropertyValues) {
        this.updateRingSize();
    }

    private handleRingMouseDown() {
        if (!this._triangleChanging) {
            this._circleChanging = true;
        }
    }

    private handleTriangleMouseDown() {
        if (!this._circleChanging) {
            this._triangleChanging = true;
        }
    }

    private getHueFromPosition(clientX: number, clientY: number) {
        const bounds = this._circle.getBoundingClientRect();
        const {offsetWidth, offsetHeight} = this._circle || {offsetWidth: 0, offsetHeight: 0};
        const alpha = (Math.atan2(clientY - bounds.top - (offsetHeight / 2), clientX - bounds.left - (offsetWidth / 2)) * (180 / Math.PI)) + 90;
        let degrees = alpha;
        if (alpha < 0) {
            degrees = alpha + 360;
        } else if (alpha >= 360) {
            degrees = alpha - 360;
        }
        return Math.round(degrees * 100) / 100;
    }

    public render(): TemplateResult {
        this.style.setProperty('--ring-size', `${this._ringSize}px`);
        this.style.setProperty('--hue', `${this.hue}deg`);
        this.style.setProperty('--saturation', `${this.saturation * 100}%`);
        this.style.setProperty('--lightness', `${this.lightness * 100}%`);
        return html`
            <div class="ground">
                <div
                    class="circle"
                    @mousedown=${this.handleRingMouseDown}
                    @touchstart=${this.handleRingMouseDown}></div>
                <div class="triangle-container">
                    <div
                        class="triangle">
                        <div
                            class="triangle-gradient"
                            @mousedown=${this.handleTriangleMouseDown}
                            @touchstart=${this.handleTriangleMouseDown}>
                            <span class="triangle-indicator"></span>
                        </div>
                    </div>
                </div>
                ${!this.hideValue
                    ? html`
                        <div class="value"></div>`
                    : ''
                }
            </div>`
    }

    private getSaturationAndLightnessFromPosition(clientX: number, clientY: number): {
        saturation: number;
        lightness: number
    } {
        const bounds = this._triangle.getBoundingClientRect();
        const {offsetWidth} = this._triangle || {offsetWidth: 0, offsetHeight: 0};
        const outerRadius = offsetWidth / 2;
        const triangleWidth = SQRT_3 * outerRadius;
        const triangleHeight = SQRT_3 * 0.5 * triangleWidth;
        const x = clientX - bounds.left - outerRadius;
        const y = clientY - bounds.top - outerRadius;
        const theta = (this.hue * -1) * (Math.PI / 180);
        const cos = Math.cos(theta);
        const sin = Math.sin(theta);
        // x' = x\cos{\theta} - y \sin{\theta}
        const rotatedX = (x * cos) - (y * sin);
        // y' = y\cos{\theta} + x \sin{\theta}
        const rotatedY = (y * cos) + (x * sin);

        const precision = 10000;
        const saturation = Math.round(clamp(
            1 - ((rotatedY + outerRadius) / triangleHeight), 0, 1
        ) * precision) / precision;
        const maxLimit = 1 / (SQRT_3 * 0.5);
        const lightnessLimit = ((1 - saturation) / (SQRT_3 * 0.5) / maxLimit) * 0.5;
        const lightness = Math.round(
            clamp(
                (rotatedX + (triangleWidth * 0.5)) / triangleWidth, 0.5 - lightnessLimit, 0.5 + lightnessLimit
            ) * precision) / precision;
        return {
            saturation,
            lightness
        }
    }

    private emitColorEvent(type: string = 'color-change') {
        this.dispatchEvent(new ColorValueEvent(type, {}, {
                hue: this.hue,
                saturation: this.saturation,
                lightness: this.lightness
            }
        ));
    }

    private updateFromPosition(clientX: number, clientY: number) {
        if (this._circleChanging) {
            this.hue = this.getHueFromPosition(clientX, clientY);
            this.emitColorEvent();
        }
        if (this._triangleChanging) {
            const {saturation, lightness} = this.getSaturationAndLightnessFromPosition(clientX, clientY);
            this.saturation = saturation;
            this.lightness = lightness;
            this.emitColorEvent();
        }
    }

    private updateRingSize() {
        this._ringSize = Math.round(this.offsetWidth * 0.15);
    }
}
