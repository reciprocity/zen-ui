import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-badge',
  styleUrl: 'zen-badge.scss',
  shadow: true,
})
export class ZenBadge {
  render(): HTMLZenBadgeElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
