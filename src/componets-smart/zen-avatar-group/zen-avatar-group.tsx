import { Component, Host, h, Prop } from '@stencil/core';
import { Avatar } from '../../components/helpers/types';

@Component({
  tag: 'zen-avatar-group',
  styleUrl: 'zen-avatar-group.scss',
  shadow: true,
})
export class ZenAvatarGroup {
  /** Users  */
  @Prop() readonly users: Avatar[] = [];

  /** User to display  */
  @Prop() readonly displayMax: number = 4;

  shownUsers(): Avatar[] {
    const users = this.users.slice();
    return users.splice(0, this.displayMax);
  }

  hiddenUsers(): Avatar[] {
    const users = this.users.slice();
    return users.splice(this.displayMax, users.length);
  }

  render(): HTMLElement {
    return (
      <Host class="container">
        {this.shownUsers().map(user => (
          <zen-avatar users={[user]} show-animation={this.users.length > 1} />
        ))}
        {this.hiddenUsers().length > 0 ? <zen-avatar users={this.hiddenUsers()} show-animation="true" /> : null}
      </Host>
    );
  }
}
