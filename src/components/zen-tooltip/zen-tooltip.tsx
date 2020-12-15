import { Component, Host, h, Prop } from '@stencil/core';
import { Position, Variant } from './types';

@Component({
  tag: 'zen-tooltip',
  styleUrl: 'zen-tooltip.scss',
  shadow: true,
})
export class ZenTooltip {
  private element: HTMLElement;
  /** Set tooltip position */
  @Prop() readonly position?: Position = Position.TOP;

  /** Set tooltip variant */
  @Prop() readonly variant?: Variant = Variant.DARK;

  /** Set tooltip text */
  @Prop() readonly text?: string = '';

  /** Set tooltip offset to target element */
  @Prop() readonly offset?: number = 10;

  /** Dont hide tooltip */
  @Prop() readonly alwaysVisible?: boolean = false;

  getClassNames(): string {
    return this.variant + ' ' + this.position;
  }

  show(): void {
    const previousElement = this.element.previousElementSibling as HTMLElement;
    const bounds = previousElement.getBoundingClientRect();

    this.element.style.display = 'block';
    this.element.style.left = '0';
    this.element.style.top = '0';
    const myBounds = this.element.getBoundingClientRect();

    let x = bounds.left - myBounds.left + (bounds.width - myBounds.width) / 2;
    let y = bounds.top - myBounds.top + (bounds.height - myBounds.height) / 2;

    switch (this.position) {
      case Position.LEFT:
        x -= (bounds.width + myBounds.width) / 2 + this.offset;
        break;

      case Position.RIGHT:
        x += (bounds.width + myBounds.width) / 2 + this.offset;
        break;

      case Position.TOP:
        y -= (bounds.height + myBounds.height) / 2 + this.offset;
        break;

      case Position.BOTTOM:
        y += (bounds.height + myBounds.height) / 2 + this.offset;
        break;
    }

    this.element.style.left = `${x}px`;
    this.element.style.top = `${y}px`;
  }

  hide(): void {
    this.element.style.display = 'none';
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
    return (
      <Host ref={el => (this.element = el)}>
        <span class={this.getClassNames()}>
          <slot name="text">{this.text}</slot>
        </span>
      </Host>
    );
  }
}
