import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-table-header-cell',
  styleUrl: 'zen-table-header-cell.css',
  shadow: true,
})
export class ZenTableHeaderCell {
  render(): HTMLElement {
    return (
      <Host>
        <th>
          <slot></slot>
        </th>
      </Host>
    );
  }
}
