import { Component, Host, h, Prop } from '@stencil/core';
import { Avatar, AvatarColor, AvatarData } from '../helpers/types';

@Component({
  tag: 'zen-avatar-group',
  styleUrl: 'zen-avatar-group.scss',
  shadow: true,
})
export class ZenAvatarGroup {
  /** Array of user's data  */
  @Prop() readonly users: Avatar[] = [];

  /** Max number of icons to display  */
  @Prop() readonly maxIcons: number = 4;

  getUserData(users: Avatar[]): AvatarData[] {
    const colors = this.colors();

    let index = -1;
    return users.map(user => {
      index = index < colors.length - 1 ? index + 1 : 0;

      return {
        userName: user.userName,
        email: user.email,
        imageUrl: user.imageUrl,
        color: colors[index].color,
        background: colors[index].background,
      };
    });
  }

  shownUsers(): AvatarData[] {
    const shownUsers = this.users.slice(0, this.maxIcons - 1);
    return this.getUserData(shownUsers);
  }

  hiddenUsers(): AvatarData[] {
    const hiddenUsers = this.users.slice(this.maxIcons - 1, this.users.length);
    return this.getUserData(hiddenUsers);
  }

  colors(): AvatarColor[] {
    return [
      {
        color: '#00528C',
        background: '#D5E9FA',
      },
      {
        color: '#643A6B',
        background: '#FADBFF',
      },
      {
        color: '#A26900',
        background: '#FFEED2',
      },
      {
        color: '#1B422E',
        background: '#D8F2E3',
      },
      {
        color: '#9C2531',
        background: '#FCDADD',
      },
    ];
  }

  render(): HTMLElement {
    return (
      <Host>
        {this.shownUsers().map(user => (
          <zen-avatar users={[user]} animation={this.users.length > 1} />
        ))}
        {this.hiddenUsers().length > 0 ? <zen-avatar users={this.hiddenUsers()} animation={false} /> : null}
      </Host>
    );
  }
}
