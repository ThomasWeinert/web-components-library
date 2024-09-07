export interface AttributeChanged {
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
