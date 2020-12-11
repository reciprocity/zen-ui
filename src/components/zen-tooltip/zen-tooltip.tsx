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

  getClassNames() {
    return this.variant + ' ' + this.position;
  }

  show() {
    const previousElement = this.element.previousElementSibling as HTMLElement;

    const rect = previousElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const top = previousElement.offsetTop - previousElement.scrollTop + previousElement.clientTop;
    const left = previousElement.offsetLeft - previousElement.scrollTop + previousElement.clientTop;

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const tooltip = this.element.shadowRoot.querySelector('span');

    // To solve display none has no width and height we set it to block and back again
    tooltip.style.display = 'block';
    const tooltipRect = tooltip.getBoundingClientRect();
    const tooltipWidth = tooltipRect.width;
    const tooltipHeight = tooltipRect.height;
    tooltip.style.display = 'none';

    console.log('TOOLTIP WIDTH: ', tooltipWidth);
    console.log('TOOLTIP HEIGHT: ', tooltipHeight);
    console.log('TOP: ', top);
    console.log('TOP Y: ', rect.y);
    console.log('LEFT: ', left);
    console.log('LEFT X: ', rect.x);
    console.log('RIGHT: ', rect.right);
    console.log('BOTTOM: ', rect.bottom);
    console.log('WIDTH: ', width);
    console.log('HEIGHT: ', height);
    console.log('CENTER-X: ', centerX);
    console.log('CENTER-Y: ', centerY);

    let calculatedTop = 0;
    let calculatedLeft = 0;

    // Calculate tooltip positions
    switch (this.position) {
      case Position.BOTTOM:
        calculatedLeft = centerX - tooltipWidth / 2;
        calculatedTop = centerY + height + this.offset;

        tooltip.style.left = calculatedLeft + 'px';
        tooltip.style.top = calculatedTop + 'px';
        break;
      case Position.LEFT:
        calculatedLeft = left - tooltipWidth - this.offset;
        calculatedTop = centerY - tooltipHeight / 2;

        tooltip.style.left = calculatedLeft + 'px';
        tooltip.style.top = calculatedTop + 'px';
        break;
      case Position.TOP:
        calculatedLeft = centerX - tooltipWidth / 2;
        calculatedTop = centerY + height + this.offset;

        tooltip.style.left = calculatedLeft + 'px';
        tooltip.style.bottom = calculatedTop + 'px';
        break;
      case Position.RIGHT:
        calculatedLeft = left + width + this.offset;
        calculatedTop = centerY - tooltipHeight / 2;

        tooltip.style.left = calculatedLeft + 'px';
        tooltip.style.top = calculatedTop + 'px';
        break;
    }

    tooltip.style.display = 'block';
  }

  hide() {
    this.element.shadowRoot.querySelector('span').style.display = 'none';
  }

  componentDidLoad() {
    const previousElement = this.element.previousElementSibling;
    if (previousElement) {
      previousElement.addEventListener('mouseover', () => this.show());
      previousElement.addEventListener('touchstart', () => this.show());
      previousElement.addEventListener('mouseout', () => this.hide());
      previousElement.addEventListener('touchcancel', () => this.hide());
    }
  }

  render() {
    return (
      <Host ref={el => (this.element = el)}>
        <span class={this.getClassNames()}>
          <slot name="text">{this.text}</slot>
        </span>
      </Host>
    );
  }
}
