import { Component, Host, h, Element, Prop, Watch } from '@stencil/core';
import { createPopper, Placement, Offsets } from '@popperjs/core';
import { getDefaultSlotContent, getSlotElement } from '../helpers/helpers';
import { TriggerEvent } from '../helpers/types';

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

  /** Show/hide popover */
  @Prop({ mutable: true }) visible = false;

  /** Placement */
  @Prop() readonly position: Placement = 'bottom-end';

  /** Triggering event */
  @Prop() readonly triggerEvent: TriggerEvent = 'click';

  /** Don't hide tooltip */
  @Prop({ reflect: true }) readonly alwaysVisible: boolean = false;

  /** Popover offset */
  @Prop() readonly offset: Offsets = { x: 0, y: 8 };

  @Watch('visible')
  async visibleChanged(visible: boolean): Promise<void> {
    visible ? this.show() : this.hide();
  }

  componentDidLoad(): void {
    this.targetSlotEl = getSlotElement(this.element, 'target');

    // If there is no target element use previous element
    if (!this.targetSlotEl) {
      this.targetSlotEl = this.element.previousElementSibling as HTMLElement;
    }

    // Throw error if there is no target element specified
    if (!this.targetSlotEl) {
      console.error('No target element specified for the target slot!');
      return;
    }

    // Get slot default content
    const defaultSlot = getDefaultSlotContent(this.element);

    // Throw error if there is nothing in the default slot
    if (!defaultSlot) {
      console.error('No content added to default slot!');
      return;
    }

    this.defaultSlotEl = defaultSlot[0] as HTMLElement;

    this.addTriggerEvents();
    this.visibleChanged(this.visible);
  }

  addTriggerEvents(): void {
    // Add events to the target element
    if (this.triggerEvent == 'click') {
      this.targetSlotEl.addEventListener('click', () => (this.visible = !this.visible));
    }

    if (this.triggerEvent == 'hover') {
      this.targetSlotEl.addEventListener('mousemove', () => (this.visible = true));
      this.targetSlotEl.addEventListener('mouseover', () => (this.visible = true));
      this.targetSlotEl.addEventListener('touchstart', () => (this.visible = true));
      this.targetSlotEl.addEventListener('mouseout', () => (this.visible = false));
      this.targetSlotEl.addEventListener('touchcancel', () => (this.visible = false));
    }
  }

  show(): void {
    // Create popper and set display
    this.createPopper();
    this.defaultSlotEl.style.display = 'block';
    this.visible = true;

    // Add event listener for click outside
    this.clickHandler = event => this.closeOnClickOutside(event);
    document.addEventListener('mousedown', this.clickHandler);
  }

  hide(): void {
    // Destroy popper and set display
    this.destroyPopper();
    this.defaultSlotEl.style.display = 'none';
    this.visible = false;

    // remove event listener for click outside
    if (this.clickHandler) document.removeEventListener('mousedown', this.clickHandler);
  }

  async closeOnClickOutside(event: MouseEvent): Promise<void> {
    const clickTargetNode = event.target as Node;

    if (this.targetSlotEl == clickTargetNode || this.alwaysVisible) {
      return; // Do nothing if clicked on target el or is always visible
    } else if (!this.defaultSlotEl.contains(clickTargetNode)) {
      this.visible = false; // Hide if clicked outside
    }
  }

  createPopper(): void {
    this.popperInstance = createPopper(this.targetSlotEl, this.defaultSlotEl, {
      placement: this.position,
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

  destroyPopper(): void {
    if (this.popperInstance) {
      this.popperInstance.destroy();
      this.popperInstance = null;
    }
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
