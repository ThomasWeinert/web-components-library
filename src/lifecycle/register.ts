export function getRegistration(tag: string, component: CustomElementConstructor) {
  return (name?: string) => {
    return registerComponent(name || tag, component);
  }
}

function registerComponent(tag: string, component: CustomElementConstructor) {
  const existing = customElements.get(tag);
  if (existing) {
    if (existing !== component) {
      console.warn(`"${tag}" is already defined for a different component. Unable to register component.`);
    }
    return;
  }
  customElements.define(tag, component)
}

export function registerComponents(components: CustomElementConstructor[]) {
  components.forEach(
    (component) => {
      if ('register' in component && component.register instanceof Function) {
        component.register();
      }
    }
  );
}
