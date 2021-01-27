import { h, Component, Host } from '@stencil/core';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.scss',
  shadow: true,
})
export class ZenTable {
  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
