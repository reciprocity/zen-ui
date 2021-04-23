import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-sidebar-nav',
  styleUrl: 'zen-sidebar-nav.scss',
  shadow: true,
})
export class ZenSidebarNav {
  @Element() host: HTMLZenSidebarNavElement;

  /** Make sidebar fully expanded */
  @Prop({ reflect: true }) readonly expanded = true;

  render(): HTMLElement {
    const ZenSidebar = applyPrefix('zen-sidebar', this.host);

    return (
      <Host>
        <ZenSidebar padding="sm" collapsed-size="32" expanded={this.expanded}>
          <slot></slot>
        </ZenSidebar>
      </Host>
    );
  }
}
