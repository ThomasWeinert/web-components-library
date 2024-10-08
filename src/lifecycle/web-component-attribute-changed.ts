export interface WebComponentAttributeChanged {
  attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
}
