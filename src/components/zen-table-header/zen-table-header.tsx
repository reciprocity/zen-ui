import { h, Component, Element, Host, Prop, State, Event, EventEmitter } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-table-header',
  styleUrl: 'zen-table-header.scss',
  shadow: true,
})
export class ZenTableHeader {
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

  hasExpandableRows(): boolean {
    let next = this.host.nextElementSibling as HTMLZenTableRowElement;
    while (next) {
      if (next.expandable) {
        return true;
      } else {
        next = next.nextElementSibling as HTMLZenTableRowElement;
      }
    }
    return false;
  }

  hasSelectedRows(): boolean {
    let next = this.host.nextElementSibling as HTMLZenTableRowElement;
    while (next) {
      if (next.selected) {
        return true;
      } else {
        next = next.nextElementSibling as HTMLZenTableRowElement;
      }
    }
    return false;
  }

  setSticky(): void {
    const forEach = (arr, fn) => arr.forEach(fn);

    const elements = this.host.children;
    const setSticky = (c: HTMLElement) => c.setAttribute('sticky', '');

    forEach(elements, setSticky);
  }

  onSelect(): void {
    console.log('on select');
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
      // Check also if all selected.
      this.indeterminate = !this.selected && this.hasSelectedRows();
    });
  }

  render(): HTMLElement {
    const ZenTableHeaderCell = applyPrefix('zen-table-header-cell', this.host);
    const ZenCheckBox = applyPrefix('zen-checkbox', this.host);
    return (
      <Host>
        {this.selectable && (
          <ZenTableHeaderCell class={{ widgets: true, selectable: this.selectable, expandable: this.expandable }}>
            <ZenCheckBox indeterminate={this.indeterminate} onClick={() => this.onSelect()}></ZenCheckBox>
          </ZenTableHeaderCell>
        )}
        <slot></slot>
      </Host>
    );
  }
}
