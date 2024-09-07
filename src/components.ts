import {ButtonComponent} from "./button/button.component";
import {IconComponent} from "./icon/icon.component";

const components = {
  'wct-button': ButtonComponent,
  'wct-icon': IconComponent,
}

export function registerComponents() {
  Object.entries(components).forEach(
    ([tag, component]) => {
      if (customElements.get(tag)) {
        return;
      }
      customElements.define(tag, component)
    }
  );
}
