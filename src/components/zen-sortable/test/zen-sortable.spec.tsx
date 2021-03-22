jest.mock('sortablejs');

import { newSpecPage } from '@stencil/core/testing';
import { ZenSortable } from '../zen-sortable';
import Sortable from 'sortablejs';
import { ZenSortableItem } from '../../zen-sortable-item/zen-sortable-item';
import { ZenText } from '../../zen-text/zen-text';

describe('zen-sortable', () => {
  beforeEach(() => {
    Sortable.create.mockClear();
  });

  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenSortable],
      html: `<zen-sortable>Content</zen-sortable>`,
    });

    expect(page.root).toBeTruthy();
  });

  it('should be instantiated', async () => {
    const page = await newSpecPage({
      components: [ZenSortable, ZenSortableItem, ZenText],
      html: `<zen-sortable id="sortable">
                <zen-sortable-item class="item1" data-id="1">
                  <zen-text>Item 1</zen-text>
                </zen-sortable-item>
                <zen-sortable-item class="item2" data-id="2">
                  <zen-text>Item 2</zen-text>
                </zen-sortable-item>
                <zen-sortable-item class="item3" data-id="3">
                  <zen-text>Item 3</zen-text>
                </zen-sortable-item>
                <zen-sortable-item class="item4" data-id="4">
                  <zen-text>Item 4</zen-text>
                </zen-sortable-item>
              </zen-sortable>`,
    });

    expect(Sortable.create).toHaveBeenCalledTimes(1);
    expect(Sortable.create).toHaveBeenCalledWith(page.root, {
      animation: 150,
      handle: '.handle',
      onEnd: expect.any(Function),
    });

    const dataIds = ['1', '2', '4', '3'];
    const callback = Sortable.create.mock.calls[0][1].onEnd;
    const fakeEvent = {
      stopPropagation: jest.fn(),
      target: {
        dispatchEvent: jest.fn(),
      },
      toArray: jest.fn(() => dataIds),
    };

    callback.bind(fakeEvent)(fakeEvent);
    expect(fakeEvent.stopPropagation).toHaveBeenCalledTimes(1);
    expect(fakeEvent.target.dispatchEvent).toHaveBeenCalledTimes(1);

    const triggerEvent = fakeEvent.target.dispatchEvent.mock.calls[0][0];
    expect(triggerEvent.detail).toEqual(dataIds);
    expect(triggerEvent.type).toBe('onChange');
  });
});
