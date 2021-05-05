import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-sidebar-nav-skeleton',
  styleUrl: 'zen-sidebar-nav-skeleton.scss',
  shadow: true,
})
export class ZenSidebarNavSkeleton {
  /** Width of sidebar in maximized state (css prop)  */
  @Prop() readonly width: string = '13.5rem';

  render(): HTMLElement {
    return (
      <Host style={{ width: this.width }}>
        <p>todo</p>
      </Host>
    );
  }
}
