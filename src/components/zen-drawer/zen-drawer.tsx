import { Component, Element, Host, h, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import { hideInstantly, hideWithAnimation, showInstantly, showWithAnimation } from '../helpers/animations';
import { Position } from '../helpers/types';
import { applyPrefix } from '../helpers/helpers';
import { faArrowToRight } from '@fortawesome/pro-light-svg-icons';

@Component({
  tag: 'zen-drawer',
  styleUrl: 'zen-drawer.scss',
  shadow: true,
})
export class ZenDrawer {
  private drawer: HTMLElement = null;

  @Element() host: HTMLZenDrawerElement;

  /** Is drawer visible */
  @Prop({ reflect: true }) readonly opened = false;

  /** Position */
  @Prop({ reflect: true }) readonly position: Position = 'right';

  /** Inner drawer hide button clicked */
  @Event() close: EventEmitter<void>;

  @Watch('opened')
  async openedChanged(): Promise<void> {
    this.opened ? showWithAnimation(this.drawer) : hideWithAnimation(this.drawer);
  }

  onCloseClicked(): void {
    this.close.emit();
  }

  componentDidLoad(): void {
    this.opened ? showInstantly(this.drawer) : hideInstantly(this.drawer);
  }

  render(): HTMLElement {
    const ZenButton = applyPrefix('zen-button', this.host);
    const ZenIcon = applyPrefix('zen-icon', this.host);
    return (
      <Host data-position={this.position}>
        <div class="drawer" data-position={this.position} ref={el => (this.drawer = el)}>
          <ZenButton onClick={() => this.onCloseClicked()} class="close-btn" variant="tertiary">
            <ZenIcon padding="sm" size="md" class="close-icon" icon={faArrowToRight}></ZenIcon>
          </ZenButton>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
