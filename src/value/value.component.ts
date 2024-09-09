import { webComponent } from "../lifecycle/web-component";
import { AttributeChanged } from "../lifecycle/attribute-changed";
import { createFormatterFromString } from "./formatters/formatter-factory";
import { Connected } from "../lifecycle/connected";
import { FormatterFunction } from "./formatters/formatter-function";
import { getNearestLocale } from "../properties/locale";

@webComponent('wct-value')
export class ValueComponent extends HTMLElement implements AttributeChanged {

  public static observedAttributes = [
    'value',
    'format'
  ];

  private _formatter?: FormatterFunction;
  private _value: number | string = '';

  public constructor() {
    super();
    this.style.display = 'inline-flex';
    this._value = this.textContent || '';
  }

  public get value() {
    return this._value;
  }

  public set value(value: number|string) {
    this._value = value;
    this.update();
  }

  private update() {
    this.textContent = this._formatter ? this._formatter(this._value) : '';
  }

  public attributeChangedCallback(name: string, _: string, newValue: string | null) {
    switch (name) {
      case 'format':
        this._formatter = createFormatterFromString(newValue || '', getNearestLocale(this));
        this.update();
        break;
      case 'value':
        this.value = newValue || '';
        break;
    }
  }
}
