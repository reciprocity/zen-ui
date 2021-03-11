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

  userValue(property: string): string {
    return this.users[0] ? this.users[0][property] : '';
  }

  userName(): string {
    return this.users.length == 1 ? this.userValue('userName') : '+' + this.users.length;
  }

  email(): string {
    return this.userValue('email');
  }

  background(): string {
    return this.users.length == 1 ? this.userValue('background') : '#CED4DA';
  }

  color(): string {
    return this.users.length == 1 ? this.userValue('color') : '#3E464C';
  }

  size(): string {
    return this.userValue('size');
  }

  render(): HTMLElement {
    const ZenAvatarIcon = applyPrefix('zen-avatar-icon', this.host);
    const ZenAvatarDetails = applyPrefix('zen-avatar-details', this.host);
    const ZenTooltip = applyPrefix('zen-tooltip', this.host);
    return (
      <Host>
        <ZenAvatarIcon
          class={{ 'avatar-icon': true, animation: this.animation }}
          user-name={this.userName()}
          email={this.email()}
          background={this.background()}
          color={this.color()}
          size={this.size()}
        />
        <ZenTooltip variant="light" show-delay="0" max-height={this.users.length > 4 ? '250px' : null}>
          {this.users.map((user, index) => (
            <div>
              <ZenAvatarDetails
                user-name={user.userName}
                email={user.email}
                icon-color={user.color}
                icon-background={user.background}
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
