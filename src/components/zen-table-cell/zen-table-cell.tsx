import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-table-cell',
  styleUrl: 'zen-table-cell.css',
  shadow: true,
})
export class ZenTableCell {
  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
