import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-menu-item',
  styleUrl: 'zen-menu-item.scss',
  shadow: true,
})
export class ZenMenuItem {
  render(): HTMLElement {
    return <Host>Zen menu item</Host>;
  }
}
