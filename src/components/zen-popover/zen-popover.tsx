import { Component, Host, h, Element, Prop } from '@stencil/core';
import { createPopper, Placement, Offsets } from '@popperjs/core';
import { getDefaultSlotContent, getSlotElement } from '../helpers/helpers';

@Component({
  tag: 'zen-popover',
  styleUrl: 'zen-popover.scss',
  shadow: true,
})
export class ZenPopover {
  @Element() element: HTMLZenPopoverElement;

  /** Placement */
  @Prop() readonly placement: Placement = 'bottom-end';

  /** Placement */
  @Prop() readonly offset: Offsets = { x: 0, y: 8 };

  componentDidLoad() {
    const targetSlotEl = getSlotElement(this.element, 'target');
    const defaultSlot = getDefaultSlotContent(this.element);

    if (!targetSlotEl) {
      console.error('No target element specified for the target slot!');
      return;
    }

    if (!defaultSlot) {
      console.error('No content added to default slot!');
      return;
    }

    const defaultSlotEl = getDefaultSlotContent(this.element)[0] as HTMLElement;

    const instance = createPopper(targetSlotEl, defaultSlotEl, {
      placement: this.placement,
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [this.offset.x, this.offset.y],
          },
        },
      ],
    });

    window.addEventListener('click', event => {
      const clickTargetNode = event.target as Node;

      if (defaultSlotEl.contains(clickTargetNode)) {
        return;
      } else if (clickTargetNode === targetSlotEl) {
        this.show(instance, defaultSlotEl);
      } else {
        this.hide(defaultSlotEl);
      }
    });

    this.hide(defaultSlotEl);
  }

  show(instance, element: HTMLElement): void {
    element.style.display = 'block';
    instance.forceUpdate();
  }

  hide(element: HTMLElement): void {
    element.style.display = 'none';
  }

  render(): HTMLElement {
    return (
      <Host>
        <slot name="target"></slot>
        <slot />
      </Host>
    );
  }
}
