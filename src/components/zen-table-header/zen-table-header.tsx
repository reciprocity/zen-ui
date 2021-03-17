import { h, Component, Element, Host, Prop, State, Event, EventEmitter } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

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
  @Prop({ mutable: true }) sticky = false;

  /** Show checkbox */
  @Prop({ mutable: true }) selectable = false;

  /** Select all rows */
  @Prop({ mutable: true }) selected = false;

  /** Row selected */
  @Event() headerSelectedChange: EventEmitter<boolean>;

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

  setSticky(): void {
    Array.from(this.host.children).forEach(cell => cell.setAttribute('sticky', ''));
  }

  onSelect(): void {
    this.selected = !this.selected;
    this.headerSelectedChange.emit(this.selected);
  }

  onTableChildChanged(): void {
    this.expandable = this.hasExpandableRows();
  }

  componentWillLoad(): void {
    if (this.sticky) {
      this.setSticky();
    }
  }

  componentDidLoad(): void {
    this.observer = new MutationObserver(() => this.onTableChildChanged());

    const table = this.host.parentElement;
    this.observer.observe(table, {
      childList: true,
      attributes: true,
      subtree: true,
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
            <ZenCheckBox class="checkbox" checked={this.selected} onClick={() => this.onSelect()}></ZenCheckBox>
          </div>
        )}
        <slot></slot>
      </Host>
    );
  }
}
