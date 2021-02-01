import { h, Component, Host } from '@stencil/core';

@Component({
  tag: 'zen-card',
  styleUrl: 'zen-card.scss',
  shadow: true,
})
export class ZenCard {
  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
