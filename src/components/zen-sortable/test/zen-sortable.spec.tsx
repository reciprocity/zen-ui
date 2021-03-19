import { newSpecPage } from '@stencil/core/testing';
import { ZenSortable } from '../zen-sortable';
import { ZenSortableItem } from '../../zen-sortable-item/zen-sortable-item';
import { act } from 'react-dom/test-utils';
import { waitNextFrame } from '../../helpers/helpers';
import { ZenText } from '../../zen-text/zen-text';
import { ZenSpace } from '../../zen-space/zen-space';

// export const fireMouseEvent = function (type: string, elem: EventTarget, centerX: number, centerY: number) {
//   const evt = new window.MouseEvent('MouseEvents');
//   evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);
//   return elem.dispatchEvent(new Event('onChange'));
// };
const fireMouseEvent = function (type: string, elem: EventTarget, centerX: number, centerY: number) {
  const evt = window.document.createEvent('MouseEvents');
  evt.initMouseEvent(type, true, true, window, 1, 1, 1, centerX, centerY, false, false, false, false, 0, elem);
  return elem.dispatchEvent(evt);
};

export const dragAndDrop = (elemDrag: HTMLElement, elemDrop: HTMLElement) => {
  act(() => {
    // calculate positions
    let pos = elemDrag.getBoundingClientRect();
    const center1X = Math.floor((pos.left + pos.right) / 2);
    const center1Y = Math.floor((pos.top + pos.bottom) / 2);

    pos = elemDrop.getBoundingClientRect();
    const center2X = Math.floor((pos.left + pos.right) / 2);
    const center2Y = Math.floor((pos.top + pos.bottom) / 2);

    // mouse over dragged element and mousedown
    fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
    fireMouseEvent('mouseenter', elemDrag, center1X, center1Y);
    fireMouseEvent('mouseover', elemDrag, center1X, center1Y);
    fireMouseEvent('mousedown', elemDrag, center1X, center1Y);

    // start dragging process over to drop target
    const dragStarted = fireMouseEvent('dragstart', elemDrag, center1X, center1Y);
    if (!dragStarted) {
      return;
    }

    fireMouseEvent('drag', elemDrag, center1X, center1Y);
    fireMouseEvent('mousemove', elemDrag, center1X, center1Y);
    fireMouseEvent('drag', elemDrag, center2X, center2Y);
    fireMouseEvent('mousemove', elemDrop, center2X, center2Y);

    // trigger dragging process on top of drop target
    fireMouseEvent('mouseenter', elemDrop, center2X, center2Y);
    fireMouseEvent('dragenter', elemDrop, center2X, center2Y);
    fireMouseEvent('mouseover', elemDrop, center2X, center2Y);
    fireMouseEvent('dragover', elemDrop, center2X, center2Y);

    // release dragged element on top of drop target
    fireMouseEvent('drop', elemDrop, center2X, center2Y);
    fireMouseEvent('dragend', elemDrag, center2X, center2Y);
    fireMouseEvent('mouseup', elemDrag, center2X, center2Y);
  });
};

describe('zen-sortable', () => {
  it('should render', async () => {
    const page = await newSpecPage({
      components: [ZenSortable, ZenSortableItem],
      html: `<zen-sortable>
                <sb-zen-sortable-item data-id="1">
                  <sb-zen-text>Item 1</sb-zen-text>
                </sb-zen-sortable-item>
             </zen-sortable>`,
    });

    expect(page.root).toBeTruthy();
    expect(page.root.querySelector('sb-zen-sortable-item')).toBeTruthy();
  });

  it('should return list of data-id values', async () => {
    const page = await newSpecPage({
      components: [ZenSortable, ZenSortableItem, ZenSpace, ZenText],
      html: `<zen-sortable>
                <zen-sortable-item class="item1" data-id="1">
                  <zen-text>Item 1</zen-text>
                </zen-sortable-item>
                <zen-sortable-item class="item2" data-id="2">
                  <zen-text>Item 2</zen-text>
                </zen-sortable-item >
                <zen-sortable-item class="item3" data-id="3">
                  <zen-text>Item 3</zen-text>
                </zen-sortable-item>
                <zen-sortable-item class="item4" data-id="4">
                  <zen-text>Item 4</zen-text>
                </zen-sortable-item>
              </zen-sortable>`,
    });

    let eventSpy = null;
    page.root.shadowRoot.addEventListener('onChange', ev => {
      eventSpy = ev;
    });

    await waitNextFrame();
    const item1 = page.root.querySelector('.item1') as HTMLElement;
    const item2 = page.root.querySelector('.item2') as HTMLElement;

    dragAndDrop(item1, item2);

    item1.dispatchEvent(new Event('onChange'));

    console.log(eventSpy);
    expect(eventSpy).toHaveBeenCalled();
  });
});
