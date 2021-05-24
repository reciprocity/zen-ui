import { Component, Host, h, Prop } from '@stencil/core';
import { AvatarIconSize } from '../helpers/types';

@Component({
  tag: 'zen-avatar-icon',
  styleUrl: 'zen-avatar-icon.scss',
  shadow: true,
})
export class ZenAvatarIcon {
  /** Set image URL */
  @Prop() readonly imageUrl: string = '';

  /** Set background color */
  @Prop() readonly background: string = '#abd2f5';

  /** Set font color */
  @Prop() readonly color: string = '#00528c';

  /** Set name and surname */
  @Prop() readonly userName: string = '';

  /** Set override for user name initials */
  @Prop() readonly initials: string = '';

  /** Set email */
  @Prop() readonly email: string = '';

  /** Icon size   */
  @Prop({ reflect: true }) readonly size: AvatarIconSize = 'md';

  hasImage(): boolean {
    return this.imageUrl != '';
  }

  getUserInitials(): string {
    if (this.initials) return this.initials;

    let initials = '';
    if (this.userName && this.userName.trim() != '') {
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
    } else if (this.email && this.email.trim() != '') {
      initials = this.email.substring(0, 2).toUpperCase();
    } else {
      console.error('zen-avatar-icon : Username or email has to have a value!');
    }
    return initials;
  }

  render(): HTMLElement {
    return (
      <Host style={{ background: this.background, color: this.color }}>
        <img class={{ hidden: !this.hasImage() }} src={this.imageUrl} />
        <div class={{ hidden: this.hasImage(), initials: true }}>{this.getUserInitials()}</div>
      </Host>
    );
  }
}
