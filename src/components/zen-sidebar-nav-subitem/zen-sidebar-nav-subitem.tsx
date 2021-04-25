import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-sidebar-nav-subitem',
  styleUrl: 'zen-sidebar-nav-subitem.scss',
  shadow: true,
})
export class ZenSidebarNavSubitem {
  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
