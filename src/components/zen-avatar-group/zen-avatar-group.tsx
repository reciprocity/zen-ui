import { Component, Host, h, Prop, Element } from '@stencil/core';
import { applyPrefix } from '../helpers/helpers';
import { AvatarColor, AvatarData, IconSize } from '../helpers/types';

@Component({
  tag: 'zen-avatar-group',
  styleUrl: 'zen-avatar-group.scss',
  shadow: true,
})
export class ZenAvatarGroup {
  @Element() host: HTMLZenAvatarGroupElement;

  /** Array of user's data  */
  @Prop() readonly users: AvatarData[] = [];

  /** Max number of icons to display  */
  @Prop() readonly maxIcons: number = 4;

  /** Icons size */
  @Prop() readonly size: IconSize = 'md';

  /** If multiple avatars then show icon animation  */
  @Prop({ reflect: true }) readonly animation: boolean = true;

  getUserData(users: AvatarData[]): AvatarData[] {
    const colors = this.colors();

    let index = -1;
    return users.map(user => {
      index = index < colors.length - 1 ? index + 1 : 0;
      user.color = user.color ? user.color : colors[index].color;
      user.background = user.background ? user.background : colors[index].background;
      user.size = this.size;
      return user;
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
    const ZenAvatar = applyPrefix('zen-avatar', this.host);
    return (
      <Host>
        {this.shownUsers().map(user => (
          <ZenAvatar users={[user]} animation={this.users.length > 1 && this.animation} />
        ))}
        {this.hiddenUsers().length > 0 ? <ZenAvatar users={this.hiddenUsers()} animation={false} /> : null}
      </Host>
    );
  }
}
