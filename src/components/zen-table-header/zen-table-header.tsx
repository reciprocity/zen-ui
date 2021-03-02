import { h, Component, Element, Host, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-table-header',
  styleUrl: 'zen-table-header.scss',
  shadow: true,
})
export class ZenTableHeader {
  @Element() host: HTMLZenTableHeaderElement;

  /** Remains fixed at the top of the table during vertical scrolling */
  @Prop() readonly sticky = false;

  /** Show checkbox */
  @Prop() readonly selectable = false;

  hasExpendableRows(): boolean {
    const children = Array.from(this.host.parentNode.children);
    children.forEach(child => {
      if (child.classList.contains('expendable')) return true;
    });
    return false;
  }

  setSticky(): void {
    const forEach = (arr, fn) => arr.forEach(fn);

    const elements = this.host.children;
    const setSticky = (c: HTMLElement) => c.setAttribute('sticky', '');

    forEach(elements, setSticky);
  }

  componentWillLoad(): void {
    if (this.sticky) {
      this.setSticky();
    }
  }

  render(): HTMLTableRowElement {
    const ZenTableHeaderCell = applyPrefix('zen-table-header-cell', this.host);
    const ZenCheckBox = applyPrefix('zen-checkbox', this.host);
    return (
      <Host>
        {this.selectable && (
          <ZenTableHeaderCell class={{ selectable: this.selectable, expendable: this.hasExpendableRows() }}>
            <ZenCheckBox />
          </ZenTableHeaderCell>
        )}
        <slot></slot>
      </Host>
    );
  }
}
