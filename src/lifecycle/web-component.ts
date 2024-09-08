export function webComponent(tag: string) {
  return (component: CustomElementConstructor) => {
    const existing = customElements.get(tag);
    if (existing) {
      if (existing !== component) {
        console.warn(`"${tag}" is already defined for a different component. Unable to register component.`);
      }
    } else {
      customElements.define(tag, component);
    }
    return component as any;
  }
}
