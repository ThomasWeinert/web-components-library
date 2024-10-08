import { WebComponentAttributeChanged } from "../lifecycle/web-component-attribute-changed";
import { Icon } from "./icon";
import { WebComponent } from "../lifecycle/web-component";
import { iconLibraries } from "./icon-library-service";

import styles from './icon.styles.scss';

@WebComponent(
'wct-icon',
  {
    icon: 'string',
  }
)
export class IconComponent extends HTMLElement implements WebComponentAttributeChanged {

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
