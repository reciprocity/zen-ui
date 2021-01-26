import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'zen-avatar-group',
  styleUrl: 'zen-avatar-group.scss',
  shadow: true,
})
export class ZenAvatarGroup {
  /** Users data set  */
  @Prop() readonly data: Record<string, any> = {};

  render() {
    return (
      <Host>
        <slot />
      </Host>
    );
  }
}
