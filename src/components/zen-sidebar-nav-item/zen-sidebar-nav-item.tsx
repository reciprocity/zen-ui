import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-sidebar-nav-item',
  styleUrl: 'zen-sidebar-nav-item.scss',
  shadow: true,
})
export class ZenSidebarNavItem {
  /** Render item as selected */
  @Prop({ reflect: true }) readonly selected = false;

  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
