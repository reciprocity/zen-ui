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

export function getElementPath(element: HTMLElement): HTMLElement[] {
  const path = [];
  while (element) {
    path.push(element);
    element = element.parentElement;
  }
  if (path.indexOf(window) === -1 && path.indexOf(document) === -1) path.push(document);
  if (path.indexOf(window) === -1) path.push(window);
  return path;
}
