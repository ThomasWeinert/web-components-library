type AttributeType = 'string' | 'boolean' | string[] | RegExp;
interface AttributeDefinition {
  type: AttributeType;
  description: string;
}

function observeAttributes(
  component: CustomElementConstructor,
  attributes: Record<string, AttributeType | AttributeDefinition>
) {
  const observed = (component as any)?.observedAttributes || [];
  const unobserved: string[] = Object.entries(attributes).reduce(
    (carry, [name]) => {
       if (observed.indexOf(name) < 0) {
         carry.push(name);
       }
       return carry;
    },
    [] as string[]
  );
  (component as any).observedAttributes = [...observed, ...unobserved];
}

function registerComponent(tag: string, component: CustomElementConstructor) {
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

export function WebComponent(tag: string, attributes?: Record<string, AttributeType | AttributeDefinition>) {
  return (component: CustomElementConstructor) => {
    if (attributes) {
      observeAttributes(component, attributes);
    }
    registerComponent(tag, component);
  }
}
