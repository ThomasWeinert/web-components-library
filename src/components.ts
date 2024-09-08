import {ButtonComponent} from "./button/button.component";
import {IconComponent} from "./icon/icon.component";
import {registerComponents} from "./lifecycle/register";

const components = [
  ButtonComponent,
  IconComponent,
]

export const WctComponents = {
  register: () => registerComponents(components),
}
