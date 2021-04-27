import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix, getDefaultSlotContent } from '../helpers/helpers';
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

  /** Displays a double arrow to toggle the sidebar */
  @Prop({ reflect: true }) readonly toggable: boolean = true;

  /** Width of sidebar in collapsed state (in px) */
  @Prop({ reflect: true }) readonly collapsedSize: number = 32;

  toggle(): void {
    this.expanded = !this.expanded;
  }

  getItems(): HTMLZenSidebarNavItemElement[] {
    return getDefaultSlotContent(this.host).filter(el =>
      el.tagName.endsWith('ZEN-SIDEBAR-NAV-ITEM'),
    ) as HTMLZenSidebarNavItemElement[];
  }

  itemSelected(event: CustomEvent): void {
    const newlySelected = event.target;
    const others = this.getItems().filter(item => item.selected && item !== newlySelected);
    others.forEach(item => {
      item.selected = false;
    });
  }

  onToggle(event: CustomEvent): void {
    const expanded = event.detail.expanded;
    this.getItems().forEach(item => (expanded ? item.classList.remove('collapsed') : item.classList.add('collapsed')));
  }

  render(): HTMLElement {
    const ZenSidebar = applyPrefix('zen-sidebar', this.host);
    const ZenIcon = applyPrefix('zen-icon', this.host);

    return (
      <Host>
        <ZenSidebar
          class="sidebar"
          collapsed-size={this.collapsedSize}
          expanded={this.expanded}
          onSelect={e => this.itemSelected(e)}
          onToggle={e => this.onToggle(e)}
        >
          <slot></slot>
          <slot name="footer"></slot>
          {this.toggable ? (
            <ZenIcon
              slot="wrapChildren"
              role="button"
              padding="md"
              size="md"
              class="collapse-icon hover-ignore"
              icon={faChevronDoubleLeft}
              onClick={() => this.toggle()}
            ></ZenIcon>
          ) : null}
        </ZenSidebar>
      </Host>
    );
  }
}
