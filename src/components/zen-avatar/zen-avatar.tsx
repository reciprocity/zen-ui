import { Component, Host, h, Prop } from '@stencil/core';
import { AvatarData } from '../helpers/types';

@Component({
  tag: 'zen-avatar',
  styleUrl: 'zen-avatar.scss',
  shadow: true,
})
export class ZenAvatar {
  /** Users  */
  @Prop() readonly users: AvatarData[] = [];

  /** Show icon animation  */
  @Prop({ reflect: true }) readonly animation: boolean = false;

  getUserValue(property: string): string {
    return this.users[0] ? this.users[0][property] : '';
  }

  render(): HTMLElement {
    return (
      <Host>
        <zen-avatar-icon
          class="avatar-icon"
          user-name={this.users.length == 1 ? this.getUserValue('userName') : '+' + this.users.length}
          email={this.getUserValue('email')}
          background={this.users.length == 1 ? this.getUserValue('background') : '#CED4DA'}
          color={this.users.length == 1 ? this.getUserValue('color') : '#3E464C'}
        />
        <zen-tooltip class="column" variant="light" show-delay="0" max-height={this.users.length > 4 ? '200px' : null}>
          {this.users.map((user, index) => (
            <div>
              <div class="row">
                <zen-avatar-icon
                  class="avatar"
                  user-name={user.userName}
                  color={user.color}
                  background={user.background}
                />
                <div class="column">
                  <div class="title">{user.userName}</div>
                  <div class="email">{user.email}</div>
                </div>
              </div>
              <div
                class={{
                  splitter: true,
                  hidden: index == this.users.length - 1 || this.users.length == 1,
                }}
              />
            </div>
          ))}
        </zen-tooltip>
      </Host>
    );
  }
}
