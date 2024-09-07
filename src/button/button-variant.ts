import {Severity} from "../properties/severity";

enum ButtonLevelVariant {
  Standard = 'standard',
  Emphasized = 'emphasized',
  Understated = 'understated',
  Selected = 'selected',
}

export type ButtonVariant = Severity | ButtonLevelVariant;
export const ButtonVariant = {...Severity, ...ButtonLevelVariant};
