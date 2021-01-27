import { h, Component, Host } from '@stencil/core';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.scss',
  shadow: true,
})
export class ZenTable {
  render(): HTMLTableElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
