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
    const ZenTooltip = applyPrefix('zen-tooltip', this.host);
    const ZenSpace = applyPrefix('zen-space', this.host);
    const ZenText = applyPrefix('zen-text', this.host);
    return (
      <Host>
        <ZenAvatarIcon
          class="avatar-icon"
          user-name={this.getUserName()}
          email={this.getEmail()}
          background={this.getBackground()}
          color={this.getColor()}
        />
        <ZenTooltip variant="light" show-delay="0" max-height={this.users.length > 4 ? '250px' : null}>
          {this.users.map((user, index) => (
            <div slot="content">
              <ZenSpace no-wrap padding="lg" vertical-align="start" spacing="lg">
                <ZenAvatarIcon
                  class="avatar"
                  user-name={user.userName}
                  color={user.color}
                  background={user.background}
                />
                <ZenSpace vertical padding="xs" spacing="sm">
                  <ZenText size="md" bold>
                    {user.userName}
                  </ZenText>
                  <ZenText size="sm">{user.email}</ZenText>
                </ZenSpace>
              </ZenSpace>
              <div
                class={{
                  splitter: true,
                  hidden: index == this.users.length - 1 || this.users.length == 1,
                }}
              ></div>
            </div>
          ))}
        </ZenTooltip>
      </Host>
    );
  }
}
