import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.css',
  shadow: true,
})
export class ZenTable {
  render(): HTMLElement {
    return (
      <Host>
        <div class="header">
          <slot name="header"></slot>
        </div>
        <div class="body">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
