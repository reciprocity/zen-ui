import { createMutationObserverMock, MutationObserverMock } from '../../helpers/jest';
const originalMutationObserver = global.MutationObserver;

import { newSpecPage } from '@stencil/core/testing';
import { ZenTable } from '../zen-table';

// let consoleErrorMock: jest.MockedFunction<typeof console.error>;

describe('zen-table', () => {
  let mutationObserverMock: jest.Mock<MutationObserverMock>;

  beforeEach(() => {
    mutationObserverMock = createMutationObserverMock();
    global.MutationObserver = mutationObserverMock;
  });

  afterEach(() => {
    global.MutationObserver = originalMutationObserver;
    mutationObserverMock.mockClear();
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
    const [observerInstance] = mutationObserverMock.mock.instances;
    expect(observerInstance.disconnect).toHaveBeenCalledTimes(1);
  });

  it('should throw error if columns not defined', async () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {
      // Do nothig, because we expect the error.
    });
    await newSpecPage({
      components: [ZenTable],
      html: `<zen-table>Content</zen-table>`,
    });
    expect(consoleError).toHaveBeenCalledTimes(1);
  });
});
