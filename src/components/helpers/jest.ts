type ClientPoint = { clientX: number; clientY: number };

const defaultPoint = () => ({ clientX: 0, clientY: 0 });

export const simulateClick = (target: Element, point: ClientPoint | undefined = undefined): void => {
  const mouseEvent = new MouseEvent('click', point || defaultPoint());
  target.dispatchEvent(mouseEvent);
};
