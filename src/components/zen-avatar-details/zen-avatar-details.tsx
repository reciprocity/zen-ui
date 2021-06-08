import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import {
  AvatarDetailVariant,
  AvatarIconSize,
  AvatarVariantSizes,
  Spacing,
  SpacingShorthand,
  TextSize,
} from '../helpers/types';

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
      verticalAlignment: 'center',
      avatarIconSize: 'md',
      userNameBold: true,
      textSize: 'md',
    },
  };

  @Element() host: HTMLZenAvatarDetailsElement;

  /** Set the style variant  */
  @Prop() readonly variant: AvatarDetailVariant = 'detailed';

  /** Set image URL */
  @Prop() readonly imageUrl: string = '';

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

  /** Show details tooltip  */
  @Prop() readonly showTooltip: boolean = false;

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
    const ZenTooltip = applyPrefix('zen-tooltip', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenText = applyPrefix('zen-text', this.host);
    const ZenDetails = applyPrefix('zen-avatar-details', this.host);
    return (
      <Host>
        <ZenSpace
          no-wrap
          stretch
          padding={this.padding}
          padding-top={this.paddingTop}
          padding-right={this.paddingRight}
          padding-bottom={this.paddingBottom}
          padding-left={this.paddingLeft}
          spacing="md"
          vertical-align={sizes.verticalAlignment}
        >
          <ZenAvatarIcon
            class={{ tooltip: this.showTooltip }}
            user-name={this.userName}
            image-url={this.imageUrl}
            email={this.email}
            initials={this.initials}
            color={this.iconColor}
            background={this.iconBackground}
            size={sizes.avatarIconSize as AvatarIconSize}
            data-test="avatar-icon"
          />
          {this.showTooltip && (
            <ZenTooltip padding="none" show-delay="0" style={{ width: 'auto' }}>
              <ZenDetails
                user-name={this.userName}
                image-url={this.imageUrl}
                email={this.email}
                initials={this.initials}
                icon-color={this.iconColor}
                icon-background={this.iconBackground}
                data-test="avatar-details-tooltip"
              />
            </ZenTooltip>
          )}
          <ZenSpace class="container" no-wrap stretch vertical padding="xs" spacing="sm">
            {this.userName.trim() && (
              <ZenText
                class="stretch"
                truncate
                size={sizes.textSize as TextSize}
                bold={sizes.userNameBold}
                data-test="username"
              >
                {this.userName}
              </ZenText>
            )}
            {this.email.trim() && this.variant === 'detailed' && (
              <ZenText class="stretch" truncate size="md" data-test="email">
                {this.email}
              </ZenText>
            )}
          </ZenSpace>
        </ZenSpace>
      </Host>
    );
  }
}
