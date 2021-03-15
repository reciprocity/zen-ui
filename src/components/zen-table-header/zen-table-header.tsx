import { h, Component, Element, Host, Prop, State, Event, EventEmitter } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-table-header',
  styleUrl: 'zen-table-header.scss',
  shadow: true,
})
export class ZenTableHeader {
  private checked = false;
  @State() expandable = false;
  @State() indeterminate = false;

  @Element() host: HTMLZenTableHeaderElement;

  /** Remains fixed at the top of the table during vertical scrolling */
  @Prop() readonly sticky: boolean = false;

  /** Show checkbox */
  @Prop() readonly selectable: boolean = false;

  /** Select all rows */
  @Prop() readonly selected: boolean = false;

  /** Row selected */
  @Event() headerSelected: EventEmitter<boolean>;

  rows(): HTMLZenTableRowElement[] {
    const rows = [];
    let next = this.host.nextElementSibling as HTMLZenTableRowElement;
    while (next) {
      rows.push(next);
      next = next.nextElementSibling as HTMLZenTableRowElement;
    }
    return rows;
  }

  hasExpandableRows(): boolean {
    return this.rows().some(row => row.expandable);
  }

  hasSelectedRows(): boolean {
    return this.rows().some(row => row.selected);
  }

  allSelectedRows(): boolean {
    return this.rows().every(row => row.selected);
  }

  setSticky(): void {
    const forEach = (arr, fn) => arr.forEach(fn);

    const elements = this.host.children;
    const setSticky = (c: HTMLElement) => c.setAttribute('sticky', '');

    forEach(elements, setSticky);
  }

  onSelect(): void {
    this.indeterminate = false;
    this.headerSelected.emit(!this.selected);
  }

  componentWillLoad(): void {
    if (this.sticky) {
      this.setSticky();
    }
  }

  componentDidLoad(): void {
    this.expandable = this.hasExpandableRows();
    this.indeterminate = this.hasSelectedRows();

    this.host.parentElement.addEventListener('rowSelected', () => {
      const allSelected = this.allSelectedRows();

      this.indeterminate = !this.selected && this.hasSelectedRows() && !allSelected;
      this.checked = allSelected;
    });
  }

  render(): HTMLElement {
    const ZenTableHeaderCell = applyPrefix('zen-table-header-cell', this.host);
    const ZenCheckBox = applyPrefix('zen-checkbox', this.host);
    return (
      <Host>
        {this.selectable && (
          <ZenTableHeaderCell class={{ widgets: true, selectable: this.selectable, expandable: this.expandable }}>
            <ZenCheckBox
              checked={this.checked}
              indeterminate={this.indeterminate}
              onClick={() => this.onSelect()}
            ></ZenCheckBox>
          </ZenTableHeaderCell>
        )}
        <slot></slot>
      </Host>
    );
  }
}
