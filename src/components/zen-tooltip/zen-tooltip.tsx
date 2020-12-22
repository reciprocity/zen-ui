import { Component, Host, h, Prop, State } from '@stencil/core';
import { Position, TooltipVariant } from '../helpers/helpers';

@Component({
  tag: 'zen-tooltip',
  styleUrl: 'zen-tooltip.scss',
  shadow: true,
})
export class ZenTooltip {
  private element: HTMLElement;

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

  show(): void {
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

  componentDidLoad(): void {
    if (this.alwaysVisible) {
      this.show();
      return;
    }

    const previousElement = this.element.previousElementSibling;
    if (previousElement) {
      previousElement.addEventListener('mouseover', () => this.show());
      previousElement.addEventListener('touchstart', () => this.show());
      previousElement.addEventListener('mouseout', () => this.hide());
      previousElement.addEventListener('touchcancel', () => this.hide());
    }
  }

  render(): HTMLElement {
    const classes = {
      tooltip: true,
      [`${this.variant}`]: true,
      [`${this.position}`]: true,
    };
    return (
      <Host class={{ visible: this.visible }} ref={el => (this.element = el)}>
        <div class={classes}>
          <slot>{this.label}</slot>
        </div>
      </Host>
    );
  }
}
