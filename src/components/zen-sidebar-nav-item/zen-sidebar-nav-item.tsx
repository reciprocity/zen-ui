import { Component, Host, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'zen-sidebar-nav-item',
  styleUrl: 'zen-sidebar-nav-item.scss',
  shadow: true,
})
export class ZenSidebarNavItem {
  /** Render item as selected */
  @Prop({ reflect: true }) readonly selected = false;

  /** Item was selected */
  @Event() select: EventEmitter<void>;

  @Watch('selected')
  async selectedChanged(selected: boolean): Promise<void> {
    if (!selected) return;
    this.select.emit();
  }

  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
