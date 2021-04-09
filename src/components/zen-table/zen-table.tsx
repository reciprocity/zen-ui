import { h, Component, Host, Element, Prop } from '@stencil/core';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.scss',
  shadow: true,
})
export class ZenTable {
  @Element() host: HTMLZenTableElement;

  /** Space separated css grid columns<br/>(eg. `auto 1fr 1fr 200px 1fr`) */
  @Prop() readonly columns = '';

  async componentDidLoad(): Promise<void> {
    if (!this.columns) {
      console.error('Zen-table error: Missing prop `columns`!', this.host);
    }
  }

  render(): HTMLTableElement {
    return (
      <Host style={{ gridTemplateColumns: this.columns }}>
        <slot></slot>
      </Host>
    );
  }
}
