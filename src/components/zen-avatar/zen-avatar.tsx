import { Host, h, Prop, Component } from '@stencil/core';
import { AvatarSize } from '../helpers/types';

@Component({
  tag: 'zen-avatar',
  styleUrl: 'zen-avatar.scss',
  shadow: true,
})
export class ZenAvatar {
  /** Image URL  */
  @Prop() readonly imageUrl: string = '';

  /** Background color  */
  @Prop() readonly background: string = '#abd2f5';

  /** Font color  */
  @Prop() readonly color: string = '#00528c';

  /** Name and Surname  */
  @Prop() readonly userName: string = '';

  /** Email  */
  @Prop() readonly email: string = '';

  /** Avatar size   */
  @Prop({ reflect: true }) readonly size: AvatarSize = 'md';

  hasImage(): boolean {
    return this.imageUrl != '';
  }

  getUserInitials(): string {
    let initials = '';
    if (this.userName) {
      if (/\s/.test(this.userName)) {
        // Get initials from name and surname
        initials = this.userName
          .match(/(\b([A-Z]|[a-z]))/g)
          .join('')
          .substring(0, 2)
          .toUpperCase();
      } else {
        // Get initials oly from name
        initials = this.userName.substring(0, 2).toUpperCase();
      }
    } else {
      initials = this.email.substring(0, 2).toUpperCase();
    }
    return initials;
  }

  render() {
    return (
      <Host style={{ background: this.background, color: this.color }}>
        <img class={{ hidden: !this.hasImage() }} src={this.imageUrl} />
        <div class={{ hidden: this.hasImage(), initials: true }}>{this.getUserInitials()}</div>
      </Host>
    );
  }
}
