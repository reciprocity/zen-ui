import { Component, Host, h, Prop } from '@stencil/core';
import { ArrowPosition } from './types';

@Component({
  tag: 'zen-tooltip',
  styleUrl: 'zen-tooltip.scss',
  shadow: true,
})
export class ZenTooltip {
  /** Arrow position */
  @Prop() readonly arrow?: ArrowPosition = ArrowPosition.LEFT;

  /** Set error state  */
  @Prop() readonly error?: boolean = false;

  /** Set text */
  @Prop() readonly text?: string = '';

  render() {
    return (
      <Host>
        <span class={`${this.error ? 'error' : ''} ${this.arrow ? this.arrow : ''}`}>
          {this.text}
          <slot></slot>
        </span>
      </Host>
    );
  }
}
