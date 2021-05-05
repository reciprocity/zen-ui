import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'zen-sidebar-nav-skeleton',
  styleUrl: 'zen-sidebar-nav-skeleton.scss',
  shadow: true,
})
export class ZenSidebarNavSkeleton {
  render(): HTMLElement {
    return (
      <Host>
        <p>todo</p>
      </Host>
    );
  }
}
