import { h, Component, Element, Host, Prop, State, Event, EventEmitter } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-table-header',
  styleUrl: 'zen-table-header.scss',
  shadow: true,
})
export class ZenTableHeader {
  observer: MutationObserver = null;

  @State() expandable = false;

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
    this.headerSelected.emit(!this.selected);
  }

  componentWillLoad(): void {
    if (this.sticky) {
      this.setSticky();
    }
  }

  onTableChildChanged(): void {
    this.expandable = this.hasExpandableRows();
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
