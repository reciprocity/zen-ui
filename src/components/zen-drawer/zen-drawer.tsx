import { Component, Element, Host, h, State, Prop, Watch } from '@stencil/core';

@Component({
  tag: 'zen-drawer',
  styleUrl: 'zen-drawer.scss',
  shadow: true,
})
export class ZenDrawer {
  @Element() element: HTMLZenDrawerElement;

  /** Is drawer visible */
  @Prop({ reflect: true }) readonly opened = false;

  @Watch('opened')
  async openedChanged(): Promise<void> {
    this.opened = !this.opened;
  }

  render(): HTMLElement {
    return (
      <Host class={{ opened: this.opened }}>
        <div class={{ container: true, opened: this.opened }}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
