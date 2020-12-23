import { querySelectorAllDeep } from 'query-selector-shadow-dom';
import { Position, Rect } from './types';

export function waitNextFrame(): Promise<boolean> {
  return new Promise(resolve => {
    window.requestAnimationFrame(() => resolve(true));
  });
}

export function slotPassed(host: HTMLElement, slotName: string): boolean {
  const selector = slotName ? `[slot="${slotName}"]` : 'slot';
  return !!host.querySelector(selector);
}

export function getSlotElement(host: HTMLElement, slotName: string): HTMLElement | undefined {
  // Note: Don't use this function to determine if slot was passed by consumer!
  const selector = slotName ? `slot[name="${slotName}"]` : 'slot';
  const slot = host.shadowRoot.querySelector(selector) as HTMLSlotElement;
  if (!slot) return undefined;
  return slot.assignedNodes()[0] as HTMLElement;
}

export function getDefaultSlotContent(host: HTMLElement): Element[] {
  return (host.shadowRoot.querySelector('slot:not([name])') as HTMLSlotElement).assignedElements();
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

export function containsRect(parentRect: Rect, childRect: Rect, threshold = 0): boolean {
  return (
    childRect.left - parentRect.left >= -threshold &&
    childRect.top - parentRect.top >= -threshold &&
    parentRect.left + parentRect.width - (childRect.left + childRect.width) >= -threshold &&
    parentRect.top + parentRect.height - (childRect.top + childRect.height) >= -threshold
  );
}

export function oppositePosition(position: Position): Position {
  const opposites = {
    left: 'right',
    right: 'left',
    top: 'bottom',
    bottom: 'top',
  };
  return opposites[position] as Position;
}
