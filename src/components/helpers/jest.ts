import { SpecPage } from '@stencil/core/testing';
import kebabCase from 'lodash/kebabCase';
import { jest } from '@jest/globals';
import jestMock from 'jest-mock';

type ClientPoint = { clientX: number; clientY: number };

const defaultPoint = () => ({ clientX: 0, clientY: 0 });

export const simulateMouse = (event: string, target: Element, point: ClientPoint | undefined = undefined): void => {
  const mouseEvent = new MouseEvent(event, point || defaultPoint());
  target.dispatchEvent(mouseEvent);
};

export const simulateKey = (key: string, target: Element): void => {
  const event = new KeyboardEvent('keydown', { key: key });
  target.dispatchEvent(event);
};

export const simulateClick = (target: Element, point: ClientPoint | undefined = undefined): void =>
  simulateMouse('click', target, point);

export async function propReflectsInAttributes(page: SpecPage, props: Record<string, unknown>): Promise<boolean> {
  // Use this helper to test if all supported props are reflected in attributes
  for (const [key, value] of Object.entries(props)) {
    page.rootInstance[key] = value;
    await page.waitForChanges();
    if (page.root.getAttribute(kebabCase(key)) === null) return false;
  }
  return true;
}

export interface MutationObserverMock extends MutationObserver {
  (callback: (mutation: unknown, observer: MutationObserverMock) => void): MutationObserverMock;
  observe(host: HTMLElement, options: { [key: string]: boolean }): void;
  disconnect(): void;
  trigger<T>(mutationList: T): void;
}

export const FakeMutationObserver = <MutationObserverMock>function (this: MutationObserverMock, callback) {
  this.observe = jest.fn();
  this.disconnect = jest.fn();
  // Optionally add a trigger() method to manually trigger a change
  this.trigger = mockedMutationsList => {
    callback(mockedMutationsList, this);
  };
  return this;
};

export const createMutationObserverMock = (): jestMock.Mock<MutationObserverMock> => jest.fn(FakeMutationObserver);
