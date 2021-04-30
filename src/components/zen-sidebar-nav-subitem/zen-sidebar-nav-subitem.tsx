import { Component, Host, h, Prop, Event, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'zen-sidebar-nav-subitem',
  styleUrl: 'zen-sidebar-nav-subitem.scss',
  shadow: true,
})
export class ZenSidebarNavSubitem {
  /** Render item as selected */
  @Prop({ reflect: true }) readonly selected: boolean = false;

  /** Item was selected */
  @Event() zenSubitemSelect: EventEmitter<void>;

  @Watch('selected')
  async selectedChanged(selected: boolean): Promise<void> {
    if (!selected) return;
    this.zenSubitemSelect.emit();
  }

  render(): HTMLElement {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
