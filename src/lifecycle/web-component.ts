export function webComponent(tag: string) {
  return (component: CustomElementConstructor) => {
    console.log(tag)
    const existing = customElements.get(tag);
    if (existing) {
      if (existing !== component) {
        console.warn(`"${tag}" is already defined for a different component. Unable to register component.`);
      }
    } else {
      try {
        customElements.define(tag, component);
      } catch (error) {
        console.warn(error);
      }
    }
    return component as any;
  }
}
