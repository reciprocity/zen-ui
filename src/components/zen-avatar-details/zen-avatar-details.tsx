import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { AvatarDetailVariant, AvatarVariantSizes, Spacing, SpacingShorthand } from '../helpers/types';

@Component({
  tag: 'zen-avatar-details',
  styleUrl: 'zen-avatar-details.scss',
  shadow: true,
})
export class ZenAvatarDetails {
  private propsByVariant = {
    basic: {
      verticalAlignment: 'center',
      avatarIconSize: 'sm',
      userNameBold: false,
      textSize: 'md',
    },
    'basic-lg': {
      verticalAlignment: 'center',
      avatarIconSize: 'md',
      userNameBold: false,
      textSize: 'lg',
    },
    detailed: {
      verticalAlignment: 'start',
      avatarIconSize: 'md',
      userNameBold: true,
      textSize: 'md',
    },
  };

  @Element() host: HTMLZenAvatarDetailsElement;

  /** Set the style variant  */
  @Prop() readonly variant: AvatarDetailVariant = 'detailed';

  /** Set user name  */
  @Prop() readonly userName: string = '';

  /** Set override for user name initials   */
  @Prop() readonly initials: string = '';

  /** Set user email  */
  @Prop() readonly email: string = '';

  /** Set icon color  */
  @Prop() readonly iconColor: string = '#00528C';

  /** Set icon background color  */
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

  getPropsByVariant(): AvatarVariantSizes {
    return this.propsByVariant[this.variant];
  }

  render(): HTMLElement {
    const sizes = this.getPropsByVariant();
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
          spacing="md"
          vertical-align={sizes.verticalAlignment}
        >
          <ZenAvatarIcon
            user-name={this.userName}
            email={this.email}
            initials={this.initials}
            color={this.iconColor}
            background={this.iconBackground}
            size={sizes.avatarIconSize}
            data-test="avatar-icon"
          />
          <ZenSpace no-wrap vertical padding="xs" spacing="sm">
            <ZenText size={sizes.textSize} bold={sizes.userNameBold} data-test="username">
              {this.userName}
            </ZenText>
            {this.variant === 'detailed' && (
              <ZenText size="md" data-test="email">
                {this.email}
              </ZenText>
            )}
          </ZenSpace>
        </ZenSpace>
      </Host>
    );
  }
}
