export enum Position {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

export enum Variant {
  DARK = 'dark',
  LIGHT = 'light',
  ERROR = 'error',
}

export interface MouseEvent extends Event {
  path: Node[];
}

export function waitNextFrame(): Promise<boolean> {
  return new Promise(resolve => {
    window.requestAnimationFrame(() => resolve());
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
  const allElements = document.querySelectorAll(
    'input, button, a, area, object, select, textarea, [contenteditable], [tabindex], zen-input, zen-button, zen-a, zen-area, zen-object, zen-select, zen-textarea',
  );
  const currentIndex = Array.from(allElements).findIndex(el => currentInput.isEqualNode(el));
  return allElements[(currentIndex + 1) % allElements.length] as HTMLElement;
}
