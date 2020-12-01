export interface MouseEvent extends Event {
  path: Node[];
}

export function waitNextFrame(): Promise<boolean> {
  return new Promise(resolve => {
    window.requestAnimationFrame(() => resolve());
  });
}
