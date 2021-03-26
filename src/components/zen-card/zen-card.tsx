import { h, Component, Host, Prop, Element } from '@stencil/core';
import { SpacingShorthand, Spacing } from '../helpers/types';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-card',
  styleUrl: 'zen-card.scss',
  shadow: true,
})
export class ZenCard {
  @Element() host: HTMLZenCardElement;

  /** Disables card. */
  @Prop({ reflect: true }) readonly disabled = false;

  /** <Description generated in helper file> */
  @Prop({ reflect: true }) readonly padding: SpacingShorthand = 'lg';
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingTop: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingRight: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingBottom: Spacing = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly paddingLeft: Spacing = null;

  render(): HTMLElement {
    const ZenSpace = applyPrefix('zen-space', this.host);
    return (
      <Host>
        <ZenSpace
          block
          padding={this.padding}
          padding-top={this.paddingTop}
          padding-right={this.paddingRight}
          padding-bottom={this.paddingBottom}
          padding-left={this.paddingLeft}
        >
          <slot></slot>
        </ZenSpace>
      </Host>
    );
  }
}
