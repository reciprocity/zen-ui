import { h, Component, Host, Element, Prop, Method } from '@stencil/core';
import { cleanupTableStructure } from './zen-table-helpers';

@Component({
  tag: 'zen-table',
  styleUrl: 'zen-table.scss',
  shadow: true,
})
export class ZenTable {
  childObserver: MutationObserver = null;

  @Element() host: HTMLZenTableElement;

  /** Space separated css prop <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns" target="_blank">grid-template-columns</a><br/>(eg. `auto 1fr 1fr 200px 1fr`)*/
  @Prop() readonly columns: string = '';

  /** Table cleanup in progress */
  @Prop({ attribute: 'updating' }) readonly $updating: boolean = false;

  /** Returns array with ids of selected rows (ordered as they appear in the dom) */
  @Method()
  async getSelectedRows(): Promise<string[]> {
    return this.getAllRows()
      .filter(row => rowId && row.selected)
      .map(row => row.rowId);
  }

  getAllRows(): HTMLZenTableRowElement[] {
    return Array.from(this.host.children) as HTMLZenTableRowElement[];
  }

  startChildObserver(): void {
    this.childObserver = new MutationObserver(() => cleanupTableStructure(this.host));

    this.childObserver.observe(this.host, {
      childList: true,
      attributes: true,
      subtree: true,
    });
  }

  componentDidLoad(): void {
    if (!this.columns) {
      console.error('Zen-table error: Missing prop `columns`!', this.host);
    }

    this.startChildObserver();
  }

  disconnectedCallback(): void {
    if (!this.childObserver) return;
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
