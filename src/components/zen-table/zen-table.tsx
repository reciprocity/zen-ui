import { h, Component, Host, Element, Prop } from '@stencil/core';

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
  async cleanupTableStructure(): Promise<void> {
    // todo
  }

  startChildObserver(): void {
    this.childObserver = new MutationObserver(() => this.cleanupTableStructure());

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
