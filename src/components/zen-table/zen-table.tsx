import { h, Component, Host, Element } from '@stencil/core';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.scss',
  shadow: true,
})
export class ZenTable {
  @Element() host: HTMLZenTableElement;

  render(): HTMLTableElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
