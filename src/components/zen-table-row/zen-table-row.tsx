import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-table-row',
  styleUrl: 'zen-table-row.css',
  shadow: true,
})
export class ZenTableRow {
  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
