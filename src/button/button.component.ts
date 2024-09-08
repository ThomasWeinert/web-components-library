import {ButtonVariant} from "./button-variant";
import {AttributeChanged} from "../lifecycle/attribute-changed";

// @ts-ignore
import styles from './button.styles.scss';
import { getRegistration} from "../lifecycle/register";

export class ButtonComponent extends HTMLElement implements AttributeChanged {

  public static register = getRegistration('wct-button', ButtonComponent);

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
    this.style.display = 'inline-block';
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

  public attributeChangedCallback(name: string, _: string, newValue: string) {
    switch (name) {
      case 'disabled':
        this.disabled = newValue !== null;
        break;
      case 'icon':
        this._elements.icon.dataset.active = (newValue !== '') ? 'true' : 'false';
        this._elements.icon.setAttribute('icon', newValue);
        break;
      case 'shape':
        this._elements.button.dataset.shape = newValue;
        break;
      case 'variant':
        this._elements.button.dataset.variant = newValue;
        break;
    }
  }
}

