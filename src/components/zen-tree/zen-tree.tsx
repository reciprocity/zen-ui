import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-tree',
  styleUrl: 'zen-tree.css',
  shadow: true,
})
export class ZenTree {
  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
