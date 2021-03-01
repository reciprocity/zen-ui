import { h, Component, Element, Host, Prop } from '@stencil/core';

@Component({
  tag: 'zen-table-header',
  styleUrl: 'zen-table-header.scss',
  shadow: true,
})
export class ZenTableHeader {
  @Element() host: HTMLZenTableHeaderElement;

  /** Remains fixed at the top of the table during vertical scrolling */
  @Prop() readonly sticky = false;

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
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
