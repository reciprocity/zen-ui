type ClientPoint = { clientX: number; clientY: number };

const defaultPoint = () => ({ clientX: 0, clientY: 0 });

export const simulateMouse = (event: string, target: Element, point: ClientPoint | undefined = undefined): void => {
  const mouseEvent = new MouseEvent(event, point || defaultPoint());
  target.dispatchEvent(mouseEvent);
};

export const simulateClick = (target: Element, point: ClientPoint | undefined = undefined): void =>
  simulateMouse('click', target, point);
