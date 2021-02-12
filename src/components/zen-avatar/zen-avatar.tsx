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
    return (
      <Host>
        <zen-avatar-icon
          class="avatar-icon"
          user-name={this.getUserName()}
          email={this.getEmail()}
          background={this.getBackground()}
          color={this.getColor()}
        />
        <zen-tooltip variant="light" show-delay="0" max-height={this.users.length > 4 ? '200px' : null}>
          {this.users.map((user, index) => (
            <div class="container">
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
