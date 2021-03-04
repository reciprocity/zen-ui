import { h, Component, Element, Host, Prop, State } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-table-header',
  styleUrl: 'zen-table-header.scss',
  shadow: true,
})
export class ZenTableHeader {
  @State() expandable = false;

  @Element() host: HTMLZenTableHeaderElement;

  /** Remains fixed at the top of the table during vertical scrolling */
  @Prop() readonly sticky = false;

  /** Show checkbox */
  @Prop() readonly selectable = false;

  hasExpandableRows(): boolean {
    let expandable = false;
    const children = Array.from(this.host.parentElement.children);
    children.forEach(child => {
      if (child.classList.contains('expandable')) {
        expandable = true;
        return;
      }
    });
    return expandable;
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

  componentDidLoad(): void {
    // Has to be run after component is loaded
    this.expandable = this.hasExpandableRows();
  }

  render(): HTMLTableRowElement {
    const ZenTableHeaderCell = applyPrefix('zen-table-header-cell', this.host);
    const ZenCheckBox = applyPrefix('zen-checkbox', this.host);
    return (
      <Host>
        {this.selectable && (
          <ZenTableHeaderCell class={{ selectable: this.selectable, expandable: this.expandable }}>
            <ZenCheckBox />
          </ZenTableHeaderCell>
        )}
        <slot></slot>
      </Host>
    );
  }
}
