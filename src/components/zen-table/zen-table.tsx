import { h, Component, Host, Prop } from '@stencil/core';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.scss',
  shadow: true,
})
export class ZenTable {
  /** Expands table to fill full available width */
  @Prop() readonly fullWidth: boolean = false;

  render(): HTMLElement {
    return (
      <Host
        class={{
          'full-width': this.fullWidth,
        }}
      >
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
