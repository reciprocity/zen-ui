import { h, Component, Host, Element, Prop } from '@stencil/core';
import { cleanupTableStructure } from './zen-table-helpers';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.scss',
  shadow: true,
})
export class ZenTable {
  childObserver: MutationObserver = null;

  @Element() host: HTMLZenTableElement;

  /** Space separated css grid columns<br/>(eg. `auto 1fr 1fr 200px 1fr`) */
  @Prop() readonly columns = '';

  /** Private variable (table cleanup in progress) */
  @Prop() readonly $updating: boolean = false;

  startChildObserver(): void {
    this.childObserver = new MutationObserver(() => cleanupTableStructure(this.host));

    this.childObserver.observe(this.host, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  }

  async componentDidLoad(): Promise<void> {
    if (!this.columns) {
      console.error('Zen-table error: Missing prop `columns`!', this.host);
    }

    this.startChildObserver();
  }

  disconnectedCallback(): void {
    this.childObserver.disconnect();
  }

  render(): HTMLTableElement {
    return (
      <Host style={{ gridTemplateColumns: this.columns }}>
        <slot></slot>
      </Host>
    );
  }
}
