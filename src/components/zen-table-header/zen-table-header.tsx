import { h, Component, Element, Host, Prop, State, Event, EventEmitter, Watch } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-table-header',
  styleUrl: 'zen-table-header.scss',
  shadow: true,
})
export class ZenTableHeader {
  observer: MutationObserver = null;
  @State() indeterminate = false;

  @Element() host: HTMLZenTableHeaderElement;
  @State() expandable = false;

  /** Remains fixed at the top of the table during vertical scrolling */
  @Prop() readonly sticky = false;

  /** Show checkbox */
  @Prop() readonly selectable = false;

  /** Select all rows */
  @Prop({ mutable: true }) selected = false;

  /** Row selected */
  @Event() headerSelectedChange: EventEmitter<boolean>;

  @Watch('sticky')
  async stickyChanged(sticky: boolean): Promise<void> {
    Array.from(this.host.children).forEach(cell => {
      if (sticky) {
        cell.setAttribute('sticky', '');
      } else {
        cell.removeAttribute('sticky');
      }
    });
  }

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

  hasRowsSelected(): boolean {
    return this.rows().some(row => row.selected);
  }

  hasAllRowsSelected(): boolean {
    return this.rows().every(row => row.selected);
  }

  onSelect(): void {
 	this.indeterminate = false;
    this.selected = !this.selected;
    this.headerSelectedChange.emit(this.selected);
  }

  onTableChildChanged(): void {
    this.expandable = this.hasExpandableRows();
  }

  componentDidLoad(): void {
    this.stickyChanged(this.sticky);
   	this.indeterminate = this.hasSelectedRows();

    this.host.parentElement.addEventListener('rowSelected', () => {
      const allSelected = this.allSelectedRows();
      this.indeterminate = !this.selected && this.hasSelectedRows() && !allSelected;
      this.checked = this.selected || allSelected;
    });

    this.observer = new MutationObserver(() => this.onTableChildChanged());

    const table = this.host.parentElement;
    this.observer.observe(table, {
      childList: true,
      attributes: true,
    });
  }

  disconnectedCallback(): void {
    this.observer.disconnect();
  }

  render(): HTMLElement {
    const ZenCheckBox = applyPrefix('zen-checkbox', this.host);
    return (
      <Host class={{ selectable: this.selectable, expandable: this.expandable }}>
        {this.selectable && (
          <div class="widgets">
            <ZenCheckBox class="checkbox" indeterminate={this.indeterminate} checked={this.selected} onClick={() => this.onSelect()}></ZenCheckBox>
          </div>
        )}
        <slot></slot>
      </Host>
    );
  }
}
