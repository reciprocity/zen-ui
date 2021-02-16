import { Component, Host, h, Element, Prop, State } from '@stencil/core';
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
  private clickHandler = undefined;

  @Element() element: HTMLZenPopoverElement;

  @State() visible = false;

  /** Placement */
  @Prop() readonly placement: Placement = 'bottom-end';

  /** Popover offset */
  @Prop() readonly offset: Offsets = { x: 0, y: 8 };

  componentDidLoad() {
    this.targetSlotEl = getSlotElement(this.element, 'target');

    // If there is no target element use previous element
    if (!this.targetSlotEl) {
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
    this.targetSlotEl.addEventListener('click', () => {
      this.toggle();
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
    this.createPopper();
    this.defaultSlotEl.style.display = 'block';

    this.clickHandler = event => this.closeOnClickOut(event);
    document.addEventListener('mousedown', this.clickHandler);
    this.visible = true;
  }

  hide(): void {
    this.defaultSlotEl.style.display = 'none';
    this.destroyPopper();

    if (this.clickHandler) document.removeEventListener('mousedown', this.clickHandler);
    this.visible = false;
  }

  toggle(): void {
    this.visible ? this.hide() : this.show();
  }

  async closeOnClickOut(event: MouseEvent): Promise<void> {
    const clickTargetNode = event.target as Node;
    if (!this.defaultSlotEl.contains(clickTargetNode)) {
      this.hide();
    }
    return;
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
