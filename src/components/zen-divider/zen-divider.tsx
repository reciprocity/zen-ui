import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-divider',
  styleUrl: 'zen-divider.scss',
  shadow: true,
})
export class ZenDivider {
  render(): HTMLElement {
    return <Host />;
  }
}
