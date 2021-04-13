import { h, Component, Host, Prop, Element } from '@stencil/core';
import { SpacingShorthand, Spacing, CardVariant } from '../helpers/types';
import { applyPrefix } from '../helpers/helpers';

@Component({
  tag: 'zen-card',
  styleUrl: 'zen-card.scss',
  shadow: true,
})
export class ZenCard {
  @Element() host: HTMLZenCardElement;

  /** Color variant of the button */
  @Prop({ reflect: true }) readonly variant: CardVariant = 'default';

  /** Disables card. */
  @Prop({ reflect: true }) readonly disabled = false;

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
