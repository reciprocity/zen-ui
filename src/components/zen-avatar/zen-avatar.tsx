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

  /** Name Initials  */
  @Prop() readonly label: string = '';

  /** Avatar size   */
  @Prop() readonly size: AvatarSize = 'large';

  hasImage(): boolean {
    return this.imageUrl != '';
  }

  render() {
    return (
      <Host style={{ background: this.background, color: this.color }} class={this.size}>
        <img class={{ hidden: !this.hasImage(), [this.size]: true }} src={this.imageUrl} />
        <div class={{ hidden: this.hasImage(), label: true }}>{this.label}</div>
      </Host>
    );
  }
}
