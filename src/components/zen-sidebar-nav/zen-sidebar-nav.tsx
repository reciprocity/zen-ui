import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { faChevronDoubleLeft } from '@fortawesome/pro-light-svg-icons';

@Component({
  tag: 'zen-sidebar-nav',
  styleUrl: 'zen-sidebar-nav.scss',
  shadow: true,
})
export class ZenSidebarNav {
  @Element() host: HTMLZenSidebarNavElement;

  /** Make sidebar fully expanded */
  @Prop({ reflect: true, mutable: true }) expanded = true;

  toggle(): void {
    this.expanded = !this.expanded;
  }

  render(): HTMLElement {
    const ZenSidebar = applyPrefix('zen-sidebar', this.host);
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);

    return (
      <Host>
        <ZenSidebar class="sidebar" collapsed-size="32" expanded={this.expanded}>
          <slot></slot>

          <ZenSpace padding="lg md" class="footer" vertical>
            <a href="https://placeholder.com/" target="_blank">
              Privacy Policy
            </a>
            <div>Copyright © 2021</div>
          </ZenSpace>

          <ZenIcon
            slot="wrapChildren"
            role="button"
            padding="md"
            size="md"
            class="collapse-icon hover-ignore"
            icon={faChevronDoubleLeft}
            onClick={() => this.toggle()}
          ></ZenIcon>
        </ZenSidebar>
      </Host>
    );
  }
}
