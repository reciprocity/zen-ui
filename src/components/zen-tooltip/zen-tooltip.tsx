import { Component, Host, h, Prop } from '@stencil/core';
import { Position, Variant } from './types';

@Component({
  tag: 'zen-tooltip',
  styleUrl: 'zen-tooltip.scss',
  shadow: true,
})
export class ZenTooltip {
  private element: HTMLElement;
  /** Set arrow position */
  @Prop() readonly position?: Position = Position.BOTTOM;

  /** Set tooltip variant */
  @Prop() readonly variant?: Variant = Variant.DEFAULT;

  /** Set tooltip text */
  @Prop() readonly text?: string = '';

  getClassNames() {
    return this.variant + ' ' + this.position + ' ';
  }

  open() {
    this.element.shadowRoot.querySelector('span').classList.add('open');
  }

  close() {
    this.element.shadowRoot.querySelector('span').classList.remove('open');
  }

  componentDidLoad() {
    const previousElement = this.element.previousElementSibling;
    if (previousElement) {
      previousElement.addEventListener('mouseover', () => this.open());
      previousElement.addEventListener('touchstart', () => this.open());
      previousElement.addEventListener('mouseout', () => this.close());
      previousElement.addEventListener('touchcancel', () => this.close());
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
