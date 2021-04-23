import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-sidebar-nav',
  styleUrl: 'zen-sidebar-nav.scss',
  shadow: true,
})
export class ZenSidebarNav {
  render(): HTMLElement {
    return (
      <Host>
        <p>todo</p>
      </Host>
    );
  }
}
