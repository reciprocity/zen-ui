import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-sidebar-nav-item',
  styleUrl: 'zen-sidebar-nav-item.scss',
  shadow: true,
})
export class ZenSidebarNavItem {
  render(): HTMLElement {
    return (
      <Host>
        <p>todo</p>
      </Host>
    );
  }
}
