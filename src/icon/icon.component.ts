import { AttributeChanged } from "../lifecycle/attribute-changed";
import { Icon } from "./icon";
import { webComponent } from "../lifecycle/web-component";

import styles from './icon.styles.scss';
import { iconLibraries } from "./icon-library-service";

@webComponent('wct-icon')
export class IconComponent extends HTMLElement implements AttributeChanged {

  public static observedAttributes = [
    'icon'
  ];

  private readonly _elements: {
    icon: HTMLSpanElement;
  };

  public constructor() {
    super();

    const style = document.createElement('style');
    style.textContent = styles;

    const icon = document.createElement('span');
    icon.dataset.active = 'false';

    this._elements = {icon};

    const shadowRoot = this.attachShadow({mode: 'closed'});
    shadowRoot.append(style, icon);
  }

  public attributeChangedCallback(name: string, _: string, newValue: string | null) {
    switch (name) {
      case 'icon':
        this.setIcon(newValue || '');
        break;
    }
  }

  private setIcon(value: string) {
    if (value.startsWith('data:')) {
      this._elements.icon.style.setProperty('mask-image', `url(${value})`);
      this._elements.icon.dataset.active = 'true';
      return;
    }
    if (value.match(/^[\w\d]+:/)) {
      const [library, name] = value.split(':');
      const icon = iconLibraries.getIcon(library, name);
      if (icon) {
        this._elements.icon.style.setProperty('mask-image', `url(${icon})`);
        this._elements.icon.dataset.active = 'true';
        return;
      }
    }
    if (value !== '') {
      this._elements.icon.style.setProperty('mask-image', `url(${Icon.fromString(value)})`);
      this._elements.icon.dataset.active = 'true';
      return;
    }
    this._elements.icon.style.setProperty('mask-image', '');
    this._elements.icon.dataset.active = 'false';
    return;
  }
}
