import { Component, Host, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'zen-sidebar-nav-item',
  styleUrl: 'zen-sidebar-nav-item.scss',
  shadow: true,
})
export class ZenSidebarNavItem {
  /** Render item as selected */
  @Prop({ reflect: true }) readonly selected: boolean = false;

  /** Item was selected */
  @Event() zenSelect: EventEmitter<void>;

  @Watch('selected')
  selectedChanged(selected: boolean): void {
    if (!selected) return;
    this.zenSelect.emit();
  }

  render(): HTMLElement {
    return (
      <Host>
        <div class="item">
          <slot></slot>
        </div>
        <div class="subitems">
          <slot name="subitems"></slot>
        </div>
      </Host>
    );
  }
}
