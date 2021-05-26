import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-menu',
  styleUrl: 'zen-menu.scss',
  shadow: true,
})
export class ZenMenu {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
