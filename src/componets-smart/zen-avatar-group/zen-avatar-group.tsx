import { Component, Host, h, Prop } from '@stencil/core';
import { Avatar, AvatarColor, AvatarData } from '../../components/helpers/types';

@Component({
  tag: 'zen-avatar-group',
  styleUrl: 'zen-avatar-group.scss',
  shadow: true,
})
export class ZenAvatarGroup {
  /** Array of user's data  */
  @Prop() readonly users: Avatar[] = [];

  /** Max number of users to display  */
  @Prop() readonly displayMax: number = 4;

  getUserData(users: Avatar[]): AvatarData[] {
    const colors = this.getColors();

    let index = -1;
    return users.map(user => {
      if (index < colors.length - 1) {
        index++;
        return {
          userName: user.userName,
          email: user.email,
          imageUrl: user.imageUrl,
          color: colors[index].color,
          background: colors[index].background,
        };
      } else {
        index = 0;
      }
    });
  }

  shownUsers(): AvatarData[] {
    const users = this.users.slice();
    const shownUsers = users.splice(0, this.displayMax);
    return this.getUserData(shownUsers);
  }

  hiddenUsers(): AvatarData[] {
    const users = this.users.slice();
    const hiddenUsers = users.splice(this.displayMax, users.length);
    return this.getUserData(hiddenUsers);
  }

  getColors(): AvatarColor[] {
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

  getIconColor(index: number): AvatarColor {
    return this.getColors()[index];
  }

  render(): HTMLElement {
    return (
      <Host class="container">
        {this.shownUsers().map(user => (
          <zen-avatar users={[user]} animation={this.users.length > 1} />
        ))}
        {this.hiddenUsers().length > 0 ? <zen-avatar users={this.hiddenUsers()} animation={true} /> : null}
      </Host>
    );
  }
}
