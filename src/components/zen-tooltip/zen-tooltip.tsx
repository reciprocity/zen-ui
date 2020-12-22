import { Component, Host, h, Prop, State, Element } from '@stencil/core';
import { Position, TooltipVariant } from '../helpers/helpers';
import debounce from 'lodash/debounce';

@Component({
  tag: 'zen-tooltip',
  styleUrl: 'zen-tooltip.scss',
  shadow: true,
})
export class ZenTooltip {
  @Element() element: HTMLZenTooltipElement;

  @State() visible = false;

  /** Set tooltip position */
  @Prop() readonly position?: Position = 'top';

  /** Set tooltip variant */
  @Prop() readonly variant?: TooltipVariant = 'dark';

  /** Set tooltip label */
  @Prop() readonly label?: string = '';

  /** Set tooltip offset to target element */
  @Prop() readonly offset?: number = 10;

  /** Dont hide tooltip */
  @Prop() readonly alwaysVisible?: boolean = false;

  /** Limit tooltip's height and make content scroll  */
  @Prop() readonly maxHeight: string = 'none';

  /** Delay between mouse out and tooltip hide (in ms)  */
  @Prop() readonly hideDelay: number = 0;

  show(): void {
    this.debounceHide.cancel();

    if (this.visible) return;

    const previousElement = this.element.previousElementSibling as HTMLElement;
    const bounds = previousElement.getBoundingClientRect();

    this.visible = true;
    this.element.style.display = 'block';
    this.element.style.left = '0';
    this.element.style.top = '0';
    const myBounds = this.element.getBoundingClientRect();
    this.element.style.display = '';

    let x = bounds.left - myBounds.left + (bounds.width - myBounds.width) / 2;
    let y = bounds.top - myBounds.top + (bounds.height - myBounds.height) / 2;

    switch (this.position) {
      case 'left':
        x -= (bounds.width + myBounds.width) / 2 + this.offset;
        break;

      case 'right':
        x += (bounds.width + myBounds.width) / 2 + this.offset;
        break;

      case 'top':
        y -= (bounds.height + myBounds.height) / 2 + this.offset;
        break;

      case 'bottom':
        y += (bounds.height + myBounds.height) / 2 + this.offset;
        break;
    }

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  hide(): void {
    this.visible = false;
  }

  delay = this.maxHeight != 'none' ? Math.max(this.hideDelay, 200) : this.hideDelay;
  debounceHide = debounce(this.hide, this.delay);

  componentDidLoad(): void {
    if (this.alwaysVisible) {
      this.show();
      return;
    }

    const tooltip = this.element;
    const previousElement = tooltip.previousElementSibling;
    if (previousElement) {
      previousElement.addEventListener('mouseover', () => this.show());
      previousElement.addEventListener('touchstart', () => this.show());
      previousElement.addEventListener('mouseout', () => this.debounceHide());
      tooltip.addEventListener('touchcancel', () => this.debounceHide());
      tooltip.addEventListener('mouseover', () => this.show());
      tooltip.addEventListener('touchstart', () => this.show());
      tooltip.addEventListener('mouseout', () => this.debounceHide());
      tooltip.addEventListener('touchcancel', () => this.debounceHide());
    }
  }

  render(): HTMLElement {
    const classes = {
      tooltip: true,
      [this.variant]: true,
      [this.position]: true,
      scrollable: this.maxHeight !== 'none',
    };
    return (
      <Host style={{ 'max-height': this.maxHeight }} class={{ visible: this.visible, ...classes }} tabindex="1">
        <slot>{this.label}</slot>
        <div
          class={{
            arrow: true,
            [this.position]: true,
            [this.variant]: true,
          }}
        ></div>
      </Host>
    );
  }
}
