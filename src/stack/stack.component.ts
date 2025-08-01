import {html, LitElement, TemplateResult, unsafeCSS} from "lit";
import {customElement, property} from 'lit/decorators.js';
import styles from './stack.styles.scss?inline';

type StackDirection = 'column' | 'row' | 'columns';
const StackDirection = {
    Column: 'column' as StackDirection,
    Row: 'row' as StackDirection,
    Columns: 'columns' as StackDirection,
}

@customElement('wct-stack')
export class StackComponent extends LitElement {
    public static styles = unsafeCSS(styles);

    @property({ type: String, reflect: true })
    direction: StackDirection = StackDirection.Columns

    public render(): TemplateResult {
        return html`<slot></slot>`
    }
}
