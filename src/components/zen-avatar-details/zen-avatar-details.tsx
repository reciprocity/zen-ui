import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { SpacingShorthand, Size, Spacing } from '../helpers/types';

@Component({
  tag: 'zen-avatar-details',
  styleUrl: 'zen-avatar-details.scss',
  shadow: true,
})
export class ZenAvatarDetails {
  @Element() host: HTMLZenAvatarDetailsElement;

  /** User name  */
  @Prop() readonly userName: string = '';

  /** User email  */
  @Prop() readonly email: string = '';

  /** Icon color  */
  @Prop() readonly iconColor: string = '#00528C';

  /** Icon background color  */
  @Prop() readonly iconBackground: string = '#D5E9FA';

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

  /** Spacing between icon and username  */
  @Prop() readonly spacing: Size = 'md';

  render(): HTMLElement {
    const ZenAvatarIcon = applyPrefix('zen-avatar-icon', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenText = applyPrefix('zen-text', this.host);
    return (
      <Host>
        <ZenSpace
          no-wrap
          padding={this.padding}
          padding-top={this.paddingTop}
          padding-right={this.paddingRight}
          padding-bottom={this.paddingBottom}
          padding-left={this.paddingLeft}
          vertical-align="middle"
          spacing={this.spacing}
        >
          <ZenAvatarIcon
            user-name={this.userName}
            color={this.iconColor}
            background={this.iconBackground}
            data-test="avatar-icon"
          />
          <ZenSpace vertical padding="xs" spacing="sm">
            <ZenText size="md" bold data-test="username">
              {this.userName}
            </ZenText>
            <ZenText size="sm" data-test="email">
              {this.email}
            </ZenText>
          </ZenSpace>
        </ZenSpace>
      </Host>
    );
  }
}
