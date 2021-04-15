import { expect, jest, beforeAll, afterAll } from '@jest/globals';
import jestMock from 'jest-mock';
import { createMutationObserverMock, MutationObserverMock } from '../../helpers/jest';
const originalMutationObserver = global.MutationObserver;

import { newSpecPage } from '@stencil/core/testing';
import { ZenTable } from '../zen-table';

let consoleErrorMock;

describe('zen-table', () => {
  let mutationObserverMock: jestMock.Mock<MutationObserverMock>;

  beforeAll(() => {
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {
      // nothing
    });
  });

  beforeEach(() => {
    mutationObserverMock = createMutationObserverMock();
    global.MutationObserver = mutationObserverMock;
  });

  afterEach(() => {
    global.MutationObserver = originalMutationObserver;
    mutationObserverMock.mockClear();
    consoleErrorMock.mockClear();
  });

  afterAll(() => {
    consoleErrorMock.mockRestore();
  });

  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenTable],
      html: `<zen-table columns="1fr">Content</zen-table>`,
    });

    expect(page.root.innerHTML).toEqual('Content');
  });

  it('should remove mutation observer on disconnect', async () => {
    const page = await newSpecPage({
      components: [ZenTable],
      html: `<zen-table columns="1fr">Content</zen-table>`,
    });

    page.root.remove();
    await page.waitForChanges();
    const [observerInstance] = global.MutationObserver.mock.instances;
    expect(observerInstance.disconnect).toHaveBeenCalledTimes(1);
  });

  it('should throw error if columns not defined', async () => {
    await newSpecPage({
      components: [ZenTable],
      html: `<zen-table>Content</zen-table>`,
    });
    expect(global.console.error).toHaveBeenCalledTimes(1);
  });
});
