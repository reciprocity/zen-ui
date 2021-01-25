import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-table-cell',
  styleUrl: 'zen-table-cell.css',
  shadow: true,
})
export class ZenTableCell {
  render() {
    return (
      <Host>
        <td>
          <slot></slot>
        </td>
      </Host>
    );
  }
}
