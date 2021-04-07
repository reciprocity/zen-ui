import { Component, Element, Host, h, Prop, Watch, Event, EventEmitter } from '@stencil/core';
import { hideInstantly, hideWithAnimation, showInstantly, showWithAnimation } from '../helpers/animations';
import { Position, SpacingShorthand, Spacing } from '../helpers/types';
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

  /** <Description generated in helper file> */
  @Prop() readonly padding: SpacingShorthand = 'lg';
  /** Skipped */
  @Prop() readonly paddingTop: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingRight: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingBottom: Spacing = null;
  /** Skipped */
  @Prop() readonly paddingLeft: Spacing = null;

  /** Inner drawer hide button clicked */
  @Event() close: EventEmitter<void>;

  @Watch('opened')
  async openedChanged(): Promise<void> {
    if (this.opened) {
      this.host.style.display = 'block';
      showWithAnimation(this.drawer);
    } else {
      hideWithAnimation(this.drawer, () => (this.host.style.display = 'none'));
    }
  }

  onCloseClicked(): void {
    this.close.emit();
  }

  componentDidLoad(): void {
    if (this.opened) {
      showInstantly(this.drawer);
    } else {
      hideInstantly(this.drawer);
      this.host.style.display = 'none';
    }
  }

  render(): HTMLElement {
    const ZenButton = applyPrefix('zen-button', this.host);
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
    return (
      <Host data-position={this.position}>
        <ZenSpace
          class="drawer"
          data-position={this.position}
          ref={el => (this.drawer = el)}
          block
          padding={this.padding}
          padding-top={this.paddingTop}
          padding-right={this.paddingRight}
          padding-bottom={this.paddingBottom}
          padding-left={this.paddingLeft}
        >
          <ZenButton onClick={() => this.onCloseClicked()} class="close-btn" variant="tertiary">
            <ZenIcon padding="sm" size="md" class="close-icon" icon={faArrowToRight}></ZenIcon>
          </ZenButton>
          <slot></slot>
        </ZenSpace>
      </Host>
    );
  }
}
