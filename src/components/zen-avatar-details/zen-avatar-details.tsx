import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { AvatarDetailVariant, Spacing, SpacingShorthand } from '../helpers/types';

@Component({
  tag: 'zen-avatar-details',
  styleUrl: 'zen-avatar-details.scss',
  shadow: true,
})
export class ZenAvatarDetails {
  @Element() host: HTMLZenAvatarDetailsElement;

  /** Different variants  */
  @Prop() readonly variant: AvatarDetailVariant = 'detailed';

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

  getPropValueByVariant(propertyName: string): string {
    const propsByVariant = {
      basic_default: {
        verticalAlignment: 'center',
        avatarIconSize: 'sm',
        userNameBold: false,
        textSize: 'md',
      },
      basic_large: {
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
    return propsByVariant[this.variant][propertyName];
  }

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
          spacing="md"
          vertical-align={this.getPropValueByVariant('verticalAlignment')}
        >
          <ZenAvatarIcon
            user-name={this.userName}
            color={this.iconColor}
            background={this.iconBackground}
            size={this.getPropValueByVariant('avatarIconSize')}
            data-test="avatar-icon"
          />
          <ZenSpace vertical padding="xs" spacing="sm">
            <ZenText
              size={this.getPropValueByVariant('textSize')}
              bold={this.getPropValueByVariant('userNameBold')}
              data-test="username"
            >
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
