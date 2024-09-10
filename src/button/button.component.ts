import {ButtonVariant} from "./button-variant";
import {AttributeChanged} from "../lifecycle/attribute-changed";
import {webComponent} from "../lifecycle/web-component";

import styles from './button.styles.scss';

@webComponent('wct-button')
export class ButtonComponent extends HTMLElement implements AttributeChanged {

  public static observedAttributes = [
    'disabled', 'icon', 'shape', 'variant'
  ];

  private readonly _elements: {
    button: HTMLButtonElement;
    icon: HTMLElement;
    label: HTMLElement;
  };

  public constructor() {
    super();
    const style = document.createElement('style');
    style.textContent = styles;

    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.dataset.variant = ButtonVariant.Standard;

    const icon = document.createElement('wct-icon');
    icon.classList.add('icon');

    const label = document.createElement('slot');
    label.classList.add('label');

    const suffix = document.createElement('slot');
    suffix.setAttribute('name', 'suffix');
    suffix.addEventListener(
      'slotchange',
      () => suffix.dataset.filled = suffix.assignedNodes().length > 0 ? 'true' : 'false'
    );


    button.append(icon, label, suffix);

    this._elements = {button, icon, label}

    const shadowRoot = this.attachShadow({mode: 'closed'});
    shadowRoot.append(style, button);
  }

  public get disabled() {
    return this._elements.button.disabled;
  }

  public set disabled(value: boolean) {
    this._elements.button.disabled = value;
  }

  public attributeChangedCallback(name: string, _: string | null, newValue: string | null) {
    switch (name) {
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'icon':
        this._elements.icon.dataset.active = (newValue !== '') ? 'true' : 'false';
        this._elements.icon.setAttribute('icon', newValue || '');
        break;
      case 'shape':
        this._elements.button.dataset.shape = newValue || undefined;
        break;
      case 'variant':
        this._elements.button.dataset.variant = newValue || undefined;
        break;
    }
  }
}
