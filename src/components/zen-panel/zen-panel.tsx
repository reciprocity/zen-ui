import { h, Component, Element, Host, Prop, Watch } from '@stencil/core';
import { faChevronRight } from '@fortawesome/pro-regular-svg-icons';
import { SpacingShorthand, Spacing } from '../helpers/types';
import { showWithAnimation, hideWithAnimation, showInstantly, hideInstantly } from '../helpers/animations';

import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-panel',
  styleUrl: 'zen-panel.scss',
  shadow: true,
})
export class ZenPanel {
  private content: HTMLElement = null;
  private initializing = true;

  @Element() host: HTMLZenPanelElement;

  /** Default visible state */
  @Prop({ reflect: true, mutable: true }) visible = false;

  /** <Description generated in helper file> */
  @Prop({ reflect: true }) readonly padding: SpacingShorthand = 'md lg';
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingTop: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingRight: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingBottom: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingLeft: Spacing = null;

  /** Padding of content section */
  @Prop({ reflect: true }) readonly contentPadding: SpacingShorthand = 'md lg';

  @Watch('visible')
  async visibleChanged(visible: boolean): Promise<void> {
    if (visible) {
      this.initializing ? showInstantly(this.content) : showWithAnimation(this.content);
    } else {
      this.initializing ? hideInstantly(this.content) : hideWithAnimation(this.content);
    }
  }

  toggleContent(): void {
    this.visible = !this.visible;
  }

  componentDidLoad(): void {
    this.visibleChanged(this.visible);
    this.initializing = false;
  }

  render(): HTMLElement {
    const ZenIcon = applyPrefix('zen-icon', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);

    return (
      <Host>
        <ZenSpace
          class="header"
          padding={this.padding}
          padding-top={this.paddingTop}
          padding-right={this.paddingRight}
          padding-bottom={this.paddingBottom}
          padding-left={this.paddingLeft}
          onClick={() => this.toggleContent()}
        >
          <ZenIcon icon={faChevronRight} size="sm" padding="sm none" class="icon chevron" />
          <slot name="header" />
        </ZenSpace>
        <div class="content-wrapper">
          <ZenSpace padding={this.contentPadding} class="content" ref={el => (this.content = el)}>
            <slot></slot>
          </ZenSpace>
        </div>
      </Host>
    );
  }
}
