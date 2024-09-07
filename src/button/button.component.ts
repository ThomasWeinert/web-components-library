import {ButtonVariant} from "./button-variant";
import {AttributeChanged} from "../lifecycle/attribute-changed";

// @ts-ignore
import styles from './button.styles.scss';
import {Connected} from "../lifecycle/connected";

export class ButtonComponent extends HTMLElement implements AttributeChanged, Connected {

  public static observedAttributes = [
    'icon', 'shape', 'variant'
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
    button.append(icon);

    const label = document.createElement('span');
    label.classList.add('label');
    button.append(label);

    this._elements = {button, icon, label}

    const shadowRoot = this.attachShadow({mode: 'closed'});
    shadowRoot.append(style, button);
  }

  public connectedCallback(): void {
    this._elements.label.append(...this.childNodes);
  }

  public attributeChangedCallback(name: string, _: string, newValue: string) {
    switch (name) {
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

