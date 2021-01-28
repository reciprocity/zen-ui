import { h, Component, Host } from '@stencil/core';

@Component({
  tag: 'zen-table-cell',
  styleUrl: 'zen-table-cell.scss',
  shadow: true,
})
export class ZenTableCell {
  render(): HTMLTableCellElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
