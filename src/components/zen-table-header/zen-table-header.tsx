import { h, Component, Element, Host, Prop, State, Watch } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

/**
 * @slot [default] - Content for table header cells
 */
@Component({
  tag: 'zen-table-header',
  styleUrl: 'zen-table-header.scss',
  shadow: true,
})
export class ZenTableHeader {
  observer: MutationObserver = null;

  @Element() host: HTMLZenTableHeaderElement;

  @State() expandable = false;

  /** Remains fixed at the top of the table during vertical scrolling */
  @Prop({ reflect: true }) readonly sticky = false;

  /** Show checkbox */
  @Prop() readonly selectable = false;

  /** Select all rows */
  @Prop({ mutable: true }) selected = false;

  /** Checkbox indeterminate state  */
  @Prop({ mutable: true }) indeterminate = false;

  @Watch('selected')
  async selectedChanged(selected: boolean): Promise<void> {
    this.allRows().forEach(n => {
      n.selected = selected;
    });
  }

  @Watch('sticky')
  async stickyChanged(sticky: boolean): Promise<void> {
    this.toggleStickyChildren(sticky);
  }

  allRows(): HTMLZenTableRowElement[] {
    const rows = [];
    let next = this.host.nextElementSibling as HTMLZenTableRowElement;
    while (next) {
      rows.push(next);
      next = next.nextElementSibling as HTMLZenTableRowElement;
    }
    return rows;
  }

  hasExpandableRows(): boolean {
    return this.allRows().some(row => row.expandable);
  }

  hasRowsSelected(): boolean {
    return this.allRows().some(row => row.selected);
  }

  hasAllRowsSelected(): boolean {
    return this.allRows().every(row => row.selected && !row.indeterminate);
  }

  onSelect(): void {
    this.selected = !this.selected;
  }

  onTableChildChanged(): void {
    this.expandable = this.hasExpandableRows();
  }

  toggleStickyChildren(sticky: boolean): void {
    Array.from(this.host.children).forEach(cell =>
      sticky ? cell.setAttribute('sticky', '') : cell.removeAttribute('sticky'),
    );
  }

  componentDidLoad(): void {
    this.toggleStickyChildren(this.sticky);
  async componentDidLoad(): Promise<void> {
    await this.stickyChanged(this.sticky);
    this.indeterminate = this.hasRowsSelected();

    this.host.parentElement.addEventListener('rowSelectChanged', () => {
      const allSelected = this.hasAllRowsSelected();
      const someSelected = this.hasRowsSelected();

      if (!someSelected) {
        this.selected = false;
      }
      if (allSelected) {
        this.selected = true;
      }
      this.indeterminate = someSelected && !allSelected;
    });

    this.observer = new MutationObserver(() => this.onTableChildChanged());

    const table = this.host.parentElement;
    this.observer.observe(table, {
      childList: true,
      attributes: true,
    });
  }

  disconnectedCallback(): void {
    if (this.observer) this.observer.disconnect();
  }

  render(): HTMLElement {
    const ZenCheckBox = applyPrefix('zen-checkbox', this.host);
    return (
      <Host class={{ selectable: this.selectable, expandable: this.expandable }}>
        {this.selectable && (
          <div class="widgets">
            <ZenCheckBox
              class="checkbox"
              indeterminate={this.indeterminate}
              checked={this.selected}
              onClick={() => this.onSelect()}
            ></ZenCheckBox>
          </div>
        )}
        <slot></slot>
      </Host>
    );
  }
}
