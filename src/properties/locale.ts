export function getNearestLocale(target?: Element) {
  let node: Element | null = target || document.body;
  do {
    const locale = node.getAttribute('lang');
    if (locale) {
      return locale;
    }
    node = (node?.parentNode || null) as Element
  } while (node instanceof Element);
  return undefined;
}
