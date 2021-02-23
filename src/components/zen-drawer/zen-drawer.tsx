import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { hideInstantly, hideWithAnimation, showInstantly, showWithAnimation } from '../helpers/animations';
import { Position } from '../helpers/types';

@Component({
  tag: 'zen-drawer',
  styleUrl: 'zen-drawer.scss',
  shadow: true,
})
export class ZenDrawer {
  private drawer: HTMLElement = null;

  @Element() element: HTMLZenDrawerElement;

  /** Is drawer visible */
  @Prop({ reflect: true }) readonly opened = false;

  /** Position */
  @Prop({ reflect: true }) readonly position: Position = 'right';

  @Watch('opened')
  async openedChanged(): Promise<void> {
    this.opened ? showWithAnimation(this.drawer) : hideWithAnimation(this.drawer);
  }

  componentDidLoad(): void {
    this.opened ? showInstantly(this.drawer) : hideInstantly(this.drawer);
  }

  render(): HTMLElement {
    return (
      <Host data-position={this.position}>
        <div class="drawer" data-position={this.position} ref={el => (this.drawer = el)}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
