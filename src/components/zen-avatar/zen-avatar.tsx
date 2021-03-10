import { Component, Host, h, Prop, Element } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { AvatarData } from '../helpers/types';

@Component({
  tag: 'zen-avatar',
  styleUrl: 'zen-avatar.scss',
  shadow: true,
})
export class ZenAvatar {
  @Element() host: HTMLZenAvatarElement;

  /** Users  */
  @Prop() readonly users: AvatarData[] = [];

  /** Show icon animation  */
  @Prop({ reflect: true }) readonly animation: boolean = false;

  getUserValue(property: string): string {
    return this.users[0] ? this.users[0][property] : '';
  }

  getUserName(): string {
    return this.users.length == 1 ? this.getUserValue('userName') : '+' + this.users.length;
  }

  getEmail(): string {
    return this.getUserValue('email');
  }

  getBackground(): string {
    return this.users.length == 1 ? this.getUserValue('background') : '#CED4DA';
  }

  getColor(): string {
    return this.users.length == 1 ? this.getUserValue('color') : '#3E464C';
  }

  render(): HTMLElement {
    const ZenAvatarIcon = applyPrefix('zen-avatar-icon', this.host);
    const ZenAvatarDetails = applyPrefix('zen-avatar-details', this.host);
    const ZenTooltip = applyPrefix('zen-tooltip', this.host);
    return (
      <Host>
        <ZenAvatarIcon
          class={{ 'avatar-icon': true, animation: this.animation }}
          user-name={this.getUserName()}
          email={this.getEmail()}
          background={this.getBackground()}
          color={this.getColor()}
        />
        <ZenTooltip variant="light" show-delay="0" max-height={this.users.length > 4 ? '250px' : null}>
          {this.users.map((user, index) => (
            <div>
              <ZenAvatarDetails
                user-name={user.userName}
                email={user.email}
                color={user.color}
                background={user.background}
                padding="none"
              />
              <div
                class={{
                  splitter: true,
                  hidden: index == this.users.length - 1 || this.users.length == 1,
                }}
              />
            </div>
          ))}
        </ZenTooltip>
      </Host>
    );
  }
}
