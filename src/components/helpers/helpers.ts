import { querySelectorAllDeep } from 'query-selector-shadow-dom';

export function waitNextFrame(): Promise<boolean> {
  return new Promise(resolve => {
    window.requestAnimationFrame(() => resolve(true));
  });
}

export function slotPassed(host: HTMLElement, slotName: string): boolean {
  const selector = slotName ? `[slot="${slotName}"]` : 'slot';
  return !!host.querySelector(selector);
}

export function getSlotElement(host: HTMLElement, slotName?: string): HTMLElement | undefined {
  // Note: Don't use this function to determine if slot was passed by consumer!
  const selector = slotName ? `slot[name="${slotName}"]` : 'slot';
  const slot = host.shadowRoot.querySelector(selector) as HTMLSlotElement;
  if (!slot) return undefined;
  return slot.assignedNodes()[0] as HTMLElement;
}

export function getSlotContent(host: HTMLElement, name?: string): Element[] {
  const selector = name ? 'slot[name]' : 'slot:not([name])';
  const slot = host.shadowRoot.querySelector(selector) as HTMLSlotElement;
  if (!slot || !slot.assignedElements) return [];
  return slot.assignedElements();
}

export function getDefaultSlotContent(host: HTMLElement): Element[] {
  return getSlotContent(host);
}

export function getNextField(currentInput: HTMLElement): HTMLElement {
  // sort by bounding box, because compareDocumentPosition doesn't work in #shadow:
  const allElements = Array.from(
    querySelectorAllDeep('input,button,area,object,select,textarea,[contenteditable],[tabindex]'),
  ).sort((a: HTMLElement, b: HTMLElement) => {
    const rA = a.getBoundingClientRect();
    const rB = b.getBoundingClientRect();
    return rA.top - rB.top ? rA.top - rB.top : rA.left - rB.left;
  });
  const currentIndex = allElements.findIndex((el: HTMLElement) => el === currentInput);
  return allElements[(currentIndex + 1) % allElements.length] as HTMLElement;
}

export function getComposedPath(event: MouseEvent): EventTarget[] {
  return event.composedPath();
}

export function toggleAttribute(element: Element, attribute: string, value: string): void {
  if (value) {
    element.setAttribute(attribute, value);
  } else {
    element.removeAttribute(attribute);
  }
}

export const applyPrefix = <T extends string>(componentName: T, parentElement: Element): T => {
  const parentPrefix = parentElement.tagName.split('-')[0].toLowerCase();
  const sanitizedPrefix = parentPrefix !== 'zen' ? `${parentPrefix}-` : '';
  return `${sanitizedPrefix}${componentName}` as T;
};

export function parsePadding(padding: string): Record<string, unknown> {
  let paddingClasses: Record<string, unknown> = {};

  if (!padding) return paddingClasses;

  // Support padding shorthands (eg. padding: 12px 1rem 5rem;)
  const values = padding.split(' ');
  switch (values.length) {
    case 1:
      paddingClasses = {
        [`p-${values[0]}`]: true,
      };
      break;

    case 2:
      paddingClasses = {
        [`pt-${values[0]}`]: true,
        [`pb-${values[0]}`]: true,
        [`pl-${values[1]}`]: true,
        [`pr-${values[1]}`]: true,
      };
      break;

    case 3:
      paddingClasses = {
        [`pt-${values[0]}`]: true,
        [`pl-${values[1]}`]: true,
        [`pr-${values[1]}`]: true,
        [`pb-${values[2]}`]: true,
      };
      break;

    default:
      paddingClasses = {
        [`pt-${values[0]}`]: true,
        [`pr-${values[1]}`]: true,
        [`pb-${values[2]}`]: true,
        [`pl-${values[3]}`]: true,
      };
      break;
  }
  return paddingClasses;
}

export function getCssTransitionDuration(element: HTMLElement): number {
  return parseFloat(getComputedStyle(element)['transitionDuration']) * 1000 || 0;
}

function getScrollParent(element: HTMLElement) {
  // Doesn't work with shadow dom!
  if (!element) return null;
  const tallerThanParent = element.scrollHeight > element.clientHeight;
  return tallerThanParent ? element : getScrollParent(element.parentNode as HTMLElement);
}

export function scrollIntoView(element: HTMLElement, scrollParent: HTMLElement): void {
  // Note! For smooth transition scroll, set `scroll-behavior: smooth` to parent.
  // Custom function to scroll into view.
  // Native Element.scrollIntoView() doesn't work well with shadow dom on Safari and FF

  const elementBounds = element.getBoundingClientRect();
  scrollParent = scrollParent || getScrollParent(element);
  const scrollParentBounds = scrollParent.getBoundingClientRect();
  const topDistance = elementBounds.top - scrollParentBounds.top;
  const bottomDistance = elementBounds.bottom - scrollParentBounds.bottom;

  if (topDistance < 0) {
    scrollParent.scrollBy(0, topDistance);
  } else if (bottomDistance > 0) {
    scrollParent.scrollBy(0, bottomDistance);
  }
}

export function htmlToElement(html: string): Element[] {
  const template = document.createElement('template');
  template.innerHTML = html.trim();
  return Array.from(template.content.children);
}
