import { Component, Host, h, Prop } from '@stencil/core';
import { Avatar } from '../helpers/types';

@Component({
  tag: 'zen-avatar-tooltip',
  styleUrl: 'zen-avatar-tooltip.scss',
  shadow: true,
})
export class ZenAvatarTooltip {
  /** Users  */
  @Prop() readonly users: Avatar[] = [];

  /** Show icon animation  */
  @Prop() readonly showAnimation: boolean = false;

  getFirstUserValue(property: string): string {
    if (this.users && this.users.length > 0) {
      return this.users[0][property];
    }
    return '';
  }

  render(): HTMLElement {
    return (
      <Host>
        <zen-avatar-icon
          class={{ 'main-avatar-icon': true, animation: this.showAnimation }}
          user-name={this.users.length == 1 ? this.getFirstUserValue('userName') : '+' + this.users.length}
          email={this.getFirstUserValue('email')}
          background={this.users.length == 1 ? this.getFirstUserValue('background') : '#CED4DA'}
          color={this.users.length == 1 ? this.getFirstUserValue('color') : '#3E464C'}
        />
        <zen-tooltip class="column" variant="light" show-delay="0">
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
