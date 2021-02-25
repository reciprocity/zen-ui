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

export function getDefaultSlotContent(host: HTMLElement): Element[] {
  const slot = host.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement;
  if (!slot || !slot.assignedElements) return [];
  return slot.assignedElements();
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

export function applyPrefix(componentName: string, parentElement: Element): string {
  const parentPrefix = parentElement.tagName.split('-')[0].toLowerCase();
  const sanitizedPrefix = parentPrefix !== 'zen' ? `${parentPrefix}-` : '';
  return `${sanitizedPrefix}${componentName}`;
}

export function parsePadding(padding: string): Record<string, unknown> {
  let paddingClasses: Record<string, unknown> = {};

  // Support padding shorthands (eg. padding: 12px 1rem 5rem;)
  const values = padding.split(' ');
  switch (values.length) {
    case 1:
      paddingClasses = {
        [`padding-${values[0]}`]: true,
      };
      break;

    case 2:
      paddingClasses = {
        [`padding-y-${values[0]}`]: true,
        [`padding-x-${values[1]}`]: true,
      };
      break;

    case 3:
      paddingClasses = {
        [`padding-top-${values[0]}`]: true,
        [`padding-x-${values[1]}`]: true,
        [`padding-bottom-${values[2]}`]: true,
      };
      break;

    default:
      paddingClasses = {
        [`padding-top-${values[0]}`]: true,
        [`padding-right-${values[1]}`]: true,
        [`padding-bottom-${values[2]}`]: true,
        [`padding-left-${values[3]}`]: true,
      };
      break;
  }
  return paddingClasses;
}

export function getCssTransitionDuration(element: HTMLElement): number {
  return parseFloat(getComputedStyle(element)['transitionDuration']) * 1000 || 0;
}
