import { h, Component, Element, Host, Prop } from '@stencil/core';

@Component({
  tag: 'zen-table-header',
  styleUrl: 'zen-table-header.scss',
  shadow: true,
})
export class ZenTableHeader {
  /** Remains fixed at the top of the table during vertical scrolling */
  @Prop() readonly sticky = false;

  @Element() hostElement: HTMLZenTableHeaderElement;

  setSticky(): void {
    const forEach = (arr, fn) => arr.forEach(fn);

    const elements = this.hostElement.children;
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
