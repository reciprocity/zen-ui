import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { PaddingShorthand, Size, Spacings } from '../helpers/types';

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
  @Prop({ reflect: true }) readonly p: PaddingShorthand = 'lg';
  /** Skipped */
  @Prop({ reflect: true }) readonly px: Spacings = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly py: Spacings = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pt: Spacings = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pr: Spacings = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pb: Spacings = null;
  /** Skipped */
  @Prop({ reflect: true }) readonly pl: Spacings = null;

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
          p={this.p}
          px={this.px}
          py={this.py}
          pt={this.pt}
          pr={this.pr}
          pb={this.pb}
          pl={this.pl}
          vertical-align="middle"
          spacing={this.spacing}
        >
          <ZenAvatarIcon
            user-name={this.userName}
            color={this.iconColor}
            background={this.iconBackground}
            data-test="avatar-icon"
          />
          <ZenSpace vertical p="xs" spacing="sm">
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
