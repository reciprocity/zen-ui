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
    const show = async (): Promise<void> => {
      await showWithAnimation(this.drawer);
    };

    const hide = (): void => {
      hideWithAnimation(this.drawer);
    };

    this.opened ? show() : hide();
  }

  componentDidLoad(): void {
    if (this.opened) {
      showInstantly(this.drawer);
    } else {
      hideInstantly(this.drawer);
    }
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
