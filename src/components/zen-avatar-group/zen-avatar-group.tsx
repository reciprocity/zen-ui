import { Component, Host, h, State, Element, Prop } from '@stencil/core';

export interface AvatarColor {
  background: string;
  color: string;
}

@Component({
  tag: 'zen-avatar-group',
  styleUrl: 'zen-avatar-group.scss',
  shadow: true,
})
export class ZenAvatarGroup {
  @Element() hostElement: HTMLZenAvatarGroupElement;
  @State() children: Array<any> = [];

  /** Max avatars shown  */
  @Prop() readonly max: number = 4;

  componentWillLoad() {
    const colors = [
      { background: '#D5E9FA', color: '#00528C' },
      { background: '#FADBFF', color: '#643A6B' },
      { background: '#FFEED2', color: '#A26900' },
      { background: '#D8F2E3', color: '#1B422E' },
      { background: '#FCDADD', color: '#9C2531' },
    ];

    this.children = Array.from(this.hostElement.children);
    let counter = 0;

    this.children.forEach(avatar => {
      avatar.style.marginRight = '-8px';
      avatar.classList.add('animation');

      if (colors.length > counter) {
        avatar.color = colors[counter].color;
        avatar.background = colors[counter].background;
      } else {
        counter = 0;
      }
      counter++;
    });
  }

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
