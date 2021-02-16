import { Component, Host, h, Element, Prop } from '@stencil/core';
import { createPopper, Placement, Offsets } from '@popperjs/core';
import { getDefaultSlotContent, getSlotElement } from '../helpers/helpers';

@Component({
  tag: 'zen-popover',
  styleUrl: 'zen-popover.scss',
  shadow: true,
})
export class ZenPopover {
  private popperInstance = null;
  private targetSlotEl: HTMLElement = null;
  private defaultSlotEl: HTMLElement = null;

  @Element() element: HTMLZenPopoverElement;

  /** Placement */
  @Prop() readonly placement: Placement = 'bottom-end';

  /** Popover offset */
  @Prop() readonly offset: Offsets = { x: 0, y: 8 };

  componentDidLoad() {
    this.targetSlotEl = getSlotElement(this.element, 'target');

    // If there is no target element use previous element
    if (! this.targetSlotEl) {
      this.targetSlotEl = this.element.previousElementSibling as HTMLElement;
    }

    if (!this.targetSlotEl) {
      console.error('No target element specified for the target slot!');
      return;
    }

    const defaultSlot = getDefaultSlotContent(this.element);

    if (!defaultSlot) {
      console.error('No content added to default slot!');
      return;
    }

    this.defaultSlotEl = getDefaultSlotContent(this.element)[0] as HTMLElement;
    this.createPopper();

    window.addEventListener('click', event => {
      const clickTargetNode = event.target as Node;

      if (this.defaultSlotEl.contains(clickTargetNode)) {
        return;
      } else if (clickTargetNode === this.targetSlotEl) {
        this.show();
      } else {
        this.hide();
      }
    });

    this.hide();
  }

  createPopper() {
    this.popperInstance = createPopper(this.targetSlotEl, this.defaultSlotEl, {
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
  }

  destroyPopper() {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
  }

  show(): void {
    this.defaultSlotEl.style.display = 'block';
    this.createPopper()
  }

  hide(): void {
    this.defaultSlotEl.style.display = 'none';
    this.destroyPopper();
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
