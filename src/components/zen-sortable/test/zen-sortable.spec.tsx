jest.mock('sortablejs');

import { newSpecPage } from '@stencil/core/testing';
import { ZenSortable } from '../zen-sortable';
import Sortable from 'sortablejs';

describe('zen-sortable', () => {
  beforeEach(() => {
    Sortable.create.mockClear();
  });

  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenSortable],
      html: `<zen-sortable>Content</zen-sortable>`,
    });

    expect(page.root.shadowRoot).toBeTruthy();
  });

  it('should be instantiated', async () => {
    const page = await newSpecPage({
      components: [ZenSortable],
      html: `<zen-sortable>Content</zen-sortable>`,
    });

    expect(Sortable.create).toHaveBeenCalledTimes(1);
    expect(Sortable.create).toHaveBeenCalledWith(page.root, {
      animation: 150,
      handle: '.handle',
      onEnd: expect.any(Function),
    });
  });

  it('should dispatch drop event', async () => {
    await newSpecPage({
      components: [ZenSortable],
      html: `<zen-sortable>Content</zen-sortable>`,
    });
    const dataIds = ['1', '2', '4', '3'];
    const [[, { onEnd: callback }]] = Sortable.create.mock.calls;
    const fakeOnEndEvent = {
      stopPropagation: jest.fn(),
      target: {
        dispatchEvent: jest.fn(),
      },
    };
    const fakeContext = {
      toArray: jest.fn(() => dataIds),
    };

    callback.bind(fakeContext)(fakeOnEndEvent);
    expect(fakeOnEndEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(fakeOnEndEvent.target.dispatchEvent).toHaveBeenCalledTimes(1);
    const [[triggerEvent]] = fakeOnEndEvent.target.dispatchEvent.mock.calls;
    expect(triggerEvent.detail).toEqual(dataIds);
    expect(triggerEvent.type).toBe('onChange');
  });
});
