import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { AvatarDetailVariant, IconSizes, Spacing, Size } from '../helpers/types';

@Component({
  tag: 'zen-avatar-details',
  styleUrl: 'zen-avatar-details.scss',
  shadow: true,
})
export class ZenAvatarDetails {
  @Element() host: HTMLZenAvatarDetailsElement;

  /** Different variants  */
  @Prop() readonly variant: AvatarDetailVariant = 'detailed';

  /** Sizes that apply only for variant basic  */
  @Prop() readonly size: IconSizes = 'md';

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
  @Prop() readonly spacing: Size | None = 'md';

  textSize(): string {
    let textSize = 'md';
    if (this.variant == 'detailed') return textSize;

    switch (this.size) {
      case 'sm':
        textSize = 'md';
        break;
      case 'md':
        textSize = 'lg';
        break;
      case 'lg':
        textSize = 'xl';
        break;
    }

    return textSize;
  }

  render(): HTMLElement {
    const ZenAvatarIcon = applyPrefix('zen-avatar-icon', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenText = applyPrefix('zen-text', this.host);
    return (
      <Host>
        <ZenSpace
          no-wrap
          padding-top={this.paddingTop}
          padding-right={this.paddingRight}
          padding-bottom={this.paddingBottom}
          padding-left={this.paddingLeft}
          vertical-align={this.variant == 'basic' ? 'center' : 'start'}
          spacing={this.spacing}
        >
          <ZenAvatarIcon
            user-name={this.userName}
            color={this.iconColor}
            background={this.iconBackground}
            size={this.variant == 'basic' ? this.size : 'md'}
            data-test="avatar-icon"
          />
          <ZenSpace vertical padding="xs" spacing="sm">
            <ZenText size={this.textSize()} bold={this.variant == 'detailed'} data-test="username">
              {this.userName}
            </ZenText>
            {this.variant == 'detailed' && (
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
