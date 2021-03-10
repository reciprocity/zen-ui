import { Component, Host, h, Element, Prop } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { PaddingShorthand, Size } from '../helpers/types';

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
  @Prop() readonly color: string = '#00528C';

  /** Icon background color  */
  @Prop() readonly background: string = '#D5E9FA';

  /** Padding */
  @Prop() readonly padding: PaddingShorthand = 'lg';

  /** Spacing between icon and username  */
  @Prop() readonly spacing: Size = 'md';

  render(): HTMLElement {
    const ZenAvatarIcon = applyPrefix('zen-avatar-icon', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenText = applyPrefix('zen-text', this.host);
    return (
      <Host>
        <ZenSpace no-wrap padding={this.padding} vertical-align="start" spacing={this.spacing}>
          <ZenAvatarIcon user-name={this.userName} color={this.color} background={this.background} />
          <ZenSpace vertical padding="xs" spacing="sm">
            <ZenText size="md" bold>
              {this.userName}
            </ZenText>
            <ZenText size="sm">{this.email}</ZenText>
          </ZenSpace>
        </ZenSpace>
      </Host>
    );
  }
}
